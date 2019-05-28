import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL,
    COMMODITY_TO_DISTRIBUTION,
    codeListTypes,
    commodityTypeFields,
    commodityTypeOptions,
    distributionRatesTypeDefinition,
    SUBJECT_TYPE_TO_DIST_RATE,
    subjectTypeOptions,
    deliveryLengthOptions,
} from './supply-offer-form.config';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import {
    convertArrayToObject,
    transformCodeList,
    transformSuppliers,
} from 'src/common/utils';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalLoaderService } from 'src/common/containers/modal/modal-loader.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-offer-form',
    templateUrl: './supply-offer-form.component.html',
    styleUrls: ['./supply-offer-form.component.scss'],
})
export class SupplyOfferFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public commodityType = CommodityType.POWER;

    @Input()
    public id: number = null;

    @Input()
    public showCancel = true;

    public subjectTypeOptions: Array<IOption> = subjectTypeOptions;
    public deliveryLengthOptions: Array<IOption> = deliveryLengthOptions;
    public codeLists;
    public minDate: Date;
    public suppliers = [];
    public distributionRateType = '';
    public distributionLocationType = COMMODITY_TO_DISTRIBUTION[this.commodityType];

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
        }, 4);
        this.form.controls['id'].patchValue(this.id);
        this.form.controls['commodityType'].setValue(this.commodityType);

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId');
                this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE[val];
                this.cd.markForCheck();
            });

        this.form.get('distributionRateId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.setPriceNTState(val);
            });

        this.setFormByCommodity(this.commodityType);
        this.loadCodeLists();
        this.setPriceNTState();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public addBenefit = () => {
        return this.fb.group({
            value: [null],
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

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid || 1) {
            const form = {
                ...this.form.value,
                benefits: R.pipe(
                    R.map(R.values),
                    R.flatten,
                    R.filter(R_.isNotNil),
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
            annualConsumptionNTControl.disable();
        }
    }
}
