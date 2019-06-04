import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    FormArray,
    FormBuilder, FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    COMMODITY_TO_DISTRIBUTION,
    codeListTypes,
    commodityTypeFields,
    distributionRatesTypeDefinition,
    SUBJECT_TYPE_TO_DIST_RATE,
    subjectTypeOptions,
    deliveryLengthOptions,
} from './supply-offer-form.config';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalLoaderService } from 'src/common/containers/modal/modal-loader.service';
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


    public subjectTypeOptions: Array<IOption> = subjectTypeOptions;
    public deliveryLengthOptions: Array<IOption> = deliveryLengthOptions;
    public codeLists;
    public minDate: Date;
    public suppliers = [];
    public distributionRateType = '';
    public distributionLocationType = COMMODITY_TO_DISTRIBUTION[this.commodityType];
    public COMMODITY_TYPE_POWER = CommodityType.POWER;

    public prefillForm = false;

    get benefitsFormArray() {
        return <FormArray>this.form.get('benefits');
    }

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private modalsLoaderService: ModalLoaderService,
        private supplyService: SupplyService,
    ) {
        super(fb);
        this.minDate = new Date();
    }

    ngOnInit() {
        super.ngOnInit();
        this.clearFormArray((this.form.controls['benefits'] as FormArray));
        R.times(() => {
            (this.form.controls['benefits'] as FormArray).push(this.addBenefit());
        }, SupplyOfferFormComponent.benefitCount);
        this.form.controls['commodityType'].setValue(this.commodityType);

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId', false);
                this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE[val];
                this.cd.markForCheck();
            });

        this.form.get('distributionRateId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                // this.resetFieldValue('permanentPaymentPrice');
                this.setPriceNTState(val);
            });

        this.setFormByCommodity(this.commodityType);
        this.loadCodeLists();
        this.setPriceNTState();
    }

    ngAfterViewInit(): void {
        if (this.prefillForm && !R.isEmpty(this.formValues)) {
            this.prefillFormData();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        console.log('%c ***** changes *****', 'background: #bada55; color: #000; font-weight: bold', changes);
        if (changes.formValues) {
            console.log(changes.formValues.currentValue);
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

    public includesBothTariffs = (id: string) => distributionRatesTypeDefinition[DistributionType.BOTH].includes(id);

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
            this.submitAction.emit(form);
        }
    }

    public loadCodeLists = () => {
        this.supplyService.findCodelistsByTypes(codeListTypes, 'cs')
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
