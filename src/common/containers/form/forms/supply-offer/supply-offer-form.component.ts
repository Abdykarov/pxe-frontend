import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CODE_LIST,
    CODE_LIST_TYPES,
    COMMODITY_TO_DISTRIBUTION_MAP,
    CONSTS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
} from 'src/app/app.constants';
import {
    commodityTypeFields,
} from 'src/common/containers/form/forms/supply-offer/configs/supply-offer-form.config';
import {
    CommodityType,
    ICodelistOptions,
} from 'src/common/graphql/models/supply.model';
import { convertDateToSendFormatFnc } from 'src/common/utils/standalone/convert-date-to-send-format.fnc';
import {
    includesBothTariffs,
    transformCodeList,
} from 'src/common/utils';
import { formFieldsBenefit } from 'src/common/containers/form/forms/supply-offer/configs/supply-offer-benefit-form.config';
import { IBenefit } from 'src/common/graphql/models/offer.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-offer-form',
    templateUrl: './supply-offer-form.component.html',
    styleUrls: ['./supply-offer-form.component.scss'],
})
export class SupplyOfferFormComponent extends AbstractFormComponent implements OnInit, OnChanges, AfterViewInit {
    private static readonly benefitCount = 4;
    public readonly CODE_LIST_CIRCUIT_BREAKER = CODE_LIST.CIRCUIT_BREAKER;
    public readonly MAX_LENGTH_NUMBER_INPUT_WITH_HINT = CONSTS.VALIDATORS.MAX_LENGTH.NUMBER_INPUT_WITH_HINT;

    @Input()
    public commodityType = CommodityType.POWER;

    @Input()
    public showCancel = true;

    @Input()
    public formValues = null;

    @Output()
    public currentFormValues: EventEmitter<any> = new EventEmitter<any>();

    public formFieldsBenefit: IForm = formFieldsBenefit;

    public codeLists: ICodelistOptions;
    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public deliveryLengthOptions: Array<IOption> = DELIVERY_LENGTH_OPTIONS;
    public distributionRateType = '';
    public distributionLocationType = COMMODITY_TO_DISTRIBUTION_MAP[this.commodityType];
    public prefillForm = false;
    public subjectTypeOptions: Array<IOption> = SUBJECT_TYPE_OPTIONS;
    public suppliers = [];

    get benefitsFormArray() {
        return <FormArray>this.form.get('benefits');
    }

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private supplyService: SupplyService,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.clearFormArray((this.form.controls['benefits'] as FormArray));
        R.times(() => {
            (this.form.controls['benefits'] as FormArray).push(this.addBenefit());
        }, SupplyOfferFormComponent.benefitCount);
        this.form.controls['commodityType'].setValue(this.commodityType);
        this.distributionLocationType = COMMODITY_TO_DISTRIBUTION_MAP[this.commodityType];

        this.form.valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(values => {
                this.currentFormValues.emit(values);
            });

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId', false);
                this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE_MAP[val];
                this.cd.markForCheck();
            });

        this.form.get('distributionRateId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(val => {
                this.setPriceNTState(val);
            });

        this.setFormByCommodity(this.commodityType);
        this.loadCodeLists();
        this.currentFormValues.emit(this.form.value);
    }

    ngAfterViewInit(): void {
        if (this.prefillForm && !R.isEmpty(this.formValues)) {
            this.prefillFormData();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formValues) {
            if (!R.isNil(changes.formValues.currentValue)) {
                this.prefillForm = true;
            }
            if (this.form && this.form.controls) {
                this.prefillFormData();
            }
        }
    }

    public addBenefit = () => {
        return this.fb.group(formFieldsBenefit.controls, formFieldsBenefit.options);
    }

    public setFormByCommodity = (commodityType: CommodityType) => {
        R.mapObjIndexed((fields, type) => {
            if (commodityTypeFields[type]) {
                R.map((field) => {
                    if (type === commodityType) {
                        this.setEnableField(field);
                    } else {
                        this.setDisableField(field);
                    }
                }, fields);
            }
        }, commodityTypeFields);
    }

    public prefillFormData = () => {
        let id = null;
        let name = null;
        let subjectTypeId = null;
        let distributionLocation = null;
        let distributionRateId = null;
        let circuitBreakerId = null;
        let deliveryLength = null;
        let annualConsumptionId = null;
        let priceVT = null;
        let priceNT = null;
        let priceGas = null;
        let validFromTo = null;
        let deliveryFromTo = null;
        let permanentPaymentPrice = null;
        let benefits = null;
        let greenEnergy = null;

        if (!R.isEmpty(this.formValues)) {
            id = this.formValues.id;
            name = this.formValues.name;
            subjectTypeId = this.formValues.subject && this.formValues.subject.code;
            distributionLocation = this.formValues.distributionLocation && this.formValues.distributionLocation.code;
            distributionRateId = this.formValues.distributionRate && this.formValues.distributionRate.code;
            annualConsumptionId = this.formValues.annualConsumption && this.formValues.annualConsumption.code;
            circuitBreakerId = this.formValues.circuitBreaker && this.formValues.circuitBreaker.code;
            deliveryLength = this.formValues.deliveryLength;
            greenEnergy = this.formValues.greenEnergy;
            priceVT = this.formValues.priceVT && this.formValues.priceVT.toString().replace('.', ',');
            priceNT = this.formValues.priceNT && this.formValues.priceNT.toString().replace('.', ',');
            priceGas = this.formValues.priceGas && this.formValues.priceGas.toString().replace('.', ',');
            permanentPaymentPrice = this.formValues.permanentPaymentPrice &&
                this.formValues.permanentPaymentPrice.toString().replace('.', ',');
            validFromTo = this.formValues.validFrom && this.formValues.validTo && [
                new Date(this.formValues.validFrom),
                new Date(this.formValues.validTo),
            ];
            deliveryFromTo = this.formValues.deliveryFrom && this.formValues.deliveryTo && [
                new Date(this.formValues.deliveryFrom),
                new Date(this.formValues.deliveryTo),
            ];

            try {
                benefits = this.formValues.benefits && JSON.parse(this.formValues.benefits);
            } catch (e) {}
        }

        this.form.controls['id'].setValue(id);
        this.form.controls['name'].setValue(name);
        this.form.controls['subjectTypeId'].setValue(subjectTypeId);
        this.form.controls['distributionLocation'].setValue(distributionLocation);
        this.form.controls['distributionRateId'].setValue(distributionRateId);
        this.form.controls['circuitBreakerId'].setValue(circuitBreakerId);
        this.form.controls['deliveryLength'].setValue(deliveryLength);
        this.form.controls['annualConsumptionId'].setValue(annualConsumptionId);
        this.form.controls['priceVT'].setValue(priceVT);
        this.form.controls['priceNT'].setValue(priceNT);
        this.form.controls['priceGas'].setValue(priceGas);
        this.form.controls['validFromTo'].setValue(validFromTo);
        this.form.controls['deliveryFromTo'].setValue(deliveryFromTo);
        this.form.controls['permanentPaymentPrice'].setValue(permanentPaymentPrice);
        this.form.controls['greenEnergy'].setValue(greenEnergy);

        R.times((n: number) => {
            const benefit = benefits && benefits[n] || null;
            if (benefit && benefit.name) {
                (this.benefitsFormArray.controls[n] as FormGroup).controls.name.setValue(benefit.name);
                (this.benefitsFormArray.controls[n] as FormGroup).controls.url.setValue(benefit.url);
            } else {
                (this.benefitsFormArray.controls[n] as FormGroup).controls.name.setValue(null);
                (this.benefitsFormArray.controls[n] as FormGroup).controls.url.setValue(null);
            }
        }, SupplyOfferFormComponent.benefitCount);

        this.resetFormError(false);
    }

    public submitValidForm = () => {
        const form = {
            ...this.form.value,
            benefits: R.pipe(
                R.filter((benefit: IBenefit) => benefit.name),
                JSON.stringify,
            )(this.benefitsFormArray.value),
        };
        if (!R.isNil(form.validFromTo)) {
            form.validFrom = convertDateToSendFormatFnc(form.validFromTo[0]);
            form.validTo = convertDateToSendFormatFnc(form.validFromTo[1]);
        }
        if (!R.isNil(form.deliveryFromTo)) {
            form.deliveryFrom = convertDateToSendFormatFnc(form.deliveryFromTo[0]);
            form.deliveryTo = convertDateToSendFormatFnc(form.deliveryFromTo[1]);
        }
        if (!R.isNil(form.priceNT)) {
            form.priceNT = parseFloat(form.priceNT.replace(',', '.'));
        }
        if (!R.isNil(form.priceVT)) {
            form.priceVT = parseFloat(form.priceVT.replace(',', '.'));
        }
        if (!R.isNil(form.priceGas)) {
            form.priceGas = parseFloat(form.priceGas.replace(',', '.'));
        }
        if (!R.isNil(form.permanentPaymentPrice)) {
            form.permanentPaymentPrice = parseFloat(form.permanentPaymentPrice.replace(',', '.'));
        }

        if (R.isNil(form.greenEnergy)) {
            form.greenEnergy = false;
        }

        this.submitAction.emit(form);
    }

    public loadCodeLists = () => {
        this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = transformCodeList(data.findCodelistsByTypes);
                this.setPriceNTState(this.getFieldValue('distributionRateId'));
                this.cd.markForCheck();
            });
    }

    public setPriceNTState = (distributionRateId: string = null) => {
        if (includesBothTariffs(distributionRateId, this.codeLists)) {
            this.setEnableField('priceNT');
        } else {
            this.setDisableField('priceNT');
            this.resetFieldError('priceNT', true);
            this.cd.markForCheck();
        }
    }
}
