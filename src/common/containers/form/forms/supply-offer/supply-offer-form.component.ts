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
import * as R_ from 'ramda-extension';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CODE_LIST_TYPES,
    COMMODITY_TO_DISTRIBUTION_MAP,
    DELIVERY_LENGTH_OPTIONS,
    DISTRIBUTION_RATES_TYPE_DEFINITION,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
} from 'src/app/app.constants';
import {
    commodityTypeFields,
} from './supply-offer-form.config';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { transformCodeList } from 'src/common/utils';

@Component({
    selector: 'pxe-supply-offer-form',
    templateUrl: './supply-offer-form.component.html',
    styleUrls: ['./supply-offer-form.component.scss'],
})
export class SupplyOfferFormComponent extends AbstractFormComponent implements OnInit, OnChanges, AfterViewInit {
    private static readonly benefitCount = 4;

    @Input()
    public commodityType = CommodityType.POWER;

    @Input()
    public showCancel = true;

    @Input()
    public formValues = null;

    @Output()
    public currentFormValues: EventEmitter<any> = new EventEmitter<any>();

    public codeLists;
    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public deliveryLengthOptions: Array<IOption> = DELIVERY_LENGTH_OPTIONS;
    public distributionRateType = '';
    public distributionLocationType = COMMODITY_TO_DISTRIBUTION_MAP[this.commodityType];
    public prefillForm = false;
    public minDate: Date;
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
        this.minDate = new Date(new Date().getTime() + 3600 * 1000 * 24);
    }

    ngOnInit() {
        super.ngOnInit();
        this.clearFormArray((this.form.controls['benefits'] as FormArray));
        R.times(() => {
            (this.form.controls['benefits'] as FormArray).push(this.addBenefit());
        }, SupplyOfferFormComponent.benefitCount);
        this.form.controls['commodityType'].setValue(this.commodityType);

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
        this.setPriceNTState();
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
        return this.fb.group({
            benefit: [null],
        });
    }

    public includesBothTariffs = (id: string) => DISTRIBUTION_RATES_TYPE_DEFINITION[DistributionType.BOTH].includes(id);

    public setFormByCommodity = (commodityType: CommodityType) => {
        R.mapObjIndexed((fields, type) => {
            if (commodityTypeFields[type]) {
                R.map((field) => {
                    const fieldControl = this.form.get(field);
                    if (type === commodityType) {
                        fieldControl.enable();
                    } else {
                        fieldControl.disable();
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

        if (!R.isEmpty(this.formValues)) {
            id = this.formValues.id;
            name = this.formValues.name;
            subjectTypeId = this.formValues.subject && this.formValues.subject.code;
            distributionLocation = this.formValues.distributionLocation && this.formValues.distributionLocation.code;
            distributionRateId = this.formValues.distributionRate && this.formValues.distributionRate.code;
            annualConsumptionId = this.formValues.annualConsumption && this.formValues.annualConsumption.code;
            circuitBreakerId = this.formValues.circuitBreaker && this.formValues.circuitBreaker.code;
            deliveryLength = this.formValues.deliveryLength;
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

        R.times((n: number) => {
            const benefit = benefits && benefits[n] || null;
            (this.benefitsFormArray.controls[n] as FormGroup).controls['benefit'].setValue(benefit);
        }, SupplyOfferFormComponent.benefitCount);

        this.resetFormError(false);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form = {
                ...this.form.value,
                benefits: R.pipe(
                    R.map(R.values),
                    R.flatten,
                    R.filter(R_.isNotNil),
                    JSON.stringify,
                )(this.form.value.benefits),
            };
            if (!R.isNil(form.validFromTo)) {
                form.validFrom = form.validFromTo[0].toISOString().split('T')[0];
                form.validTo = form.validFromTo[1].toISOString().split('T')[0];
            }
            if (!R.isNil(form.deliveryFromTo)) {
                form.deliveryFrom = form.deliveryFromTo[0].toISOString().split('T')[0];
                form.deliveryTo = form.deliveryFromTo[1].toISOString().split('T')[0];
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
            this.submitAction.emit(form);
        }
    }

    public loadCodeLists = () => {
        this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = transformCodeList(data.findCodelistsByTypes);
                this.cd.markForCheck();
            });
    }

    public setPriceNTState = (distributionRateId: string = null) => {
        const annualConsumptionNTControl = this.form.get('priceNT');
        if (this.includesBothTariffs(distributionRateId)) {
            annualConsumptionNTControl.enable();
        } else {
            this.resetFieldValue('priceNT');
            annualConsumptionNTControl.disable();
            this.cd.markForCheck();
        }
    }
}
