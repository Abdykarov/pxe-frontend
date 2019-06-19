import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    DISTRIBUTION_RATES_TYPE_DEFINITION,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import {
    CommodityType,
    DistributionType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    commodityTypeFields,
    supplyDetailInfoBanner, supplyPointDetailAllowedFields,
} from '../supply-point-form.config';

@Component({
    selector: 'pxe-supply-point-detail-form',
    templateUrl: './supply-point-detail-form.component.html',
    styleUrls: ['./supply-point-detail-form.component.scss'],
})
export class SupplyPointDetailFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public supplyPoint: ISupplyPoint;

    public commodityType = CommodityType;
    public suppliers = [];
    public supplyDetailInfoBanner = supplyDetailInfoBanner;
    public subjectName = '';

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.setFormByCommodity(this.commodityType[this.supplyPoint.commodityType]);
        this.setAnnualConsumptionNTState(this.supplyPoint.distributionRate && this.supplyPoint.distributionRate.code);

        this.supplyDetailInfoBanner.linkData = {
            supplyPointCopy: {
                ...this.supplyPoint,
            },
        };
        this.subjectName = R.find(R.propEq('value', this.supplyPoint.subject.code))(SUBJECT_TYPE_OPTIONS).label;
        this.prefillFormData();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public prefillFormData = () => {
        let name = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;

        if (!R.isEmpty(this.supplyPoint)) {
            name = this.supplyPoint.name;
            annualConsumptionVT = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
            annualConsumptionNT = this.supplyPoint.annualConsumptionNT &&
                this.supplyPoint.annualConsumptionNT.toString().replace('.', ',');
            annualConsumption = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
        }

        this.form.controls['name'].setValue(name);
        this.form.controls['annualConsumptionVT'].setValue(annualConsumptionVT);
        this.form.controls['annualConsumptionNT'].setValue(annualConsumptionNT);
        this.form.controls['annualConsumption'].setValue(annualConsumption);

        this.resetFormError(false);
    }

    public includesBothTariffs = (id: string) => DISTRIBUTION_RATES_TYPE_DEFINITION[DistributionType.BOTH].includes(id);

    public setFormByCommodity = (commodityType: CommodityType) => {
        // R.mapObjIndexed((fields: string[], type: CommodityType) => {
        //     if (commodityTypeFields[type]) {
        //         R.map((field: string) => {
        //             const fieldControl = this.form.get(field);
        //             console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', field, R.indexOf(field, supplyPointDetailAllowedFields));
        //             if (type === commodityType && R.indexOf(field, supplyPointDetailAllowedFields[type]) >= 0) {
        //                 fieldControl.enable();
        //             } else {
        //                 fieldControl.disable();
        //             }
        //         }, fields);
        //     }
        // }, commodityTypeFields);

        R.mapObjIndexed((fieldControl, field: string) => {
            // const fieldControl = this.form.get(field);
            console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold',
                field, R.indexOf(field, supplyPointDetailAllowedFields));
            if (R.indexOf(field, supplyPointDetailAllowedFields[commodityType]) >= 0) {
                fieldControl.enable();
            } else {
                fieldControl.disable();
            }
        }, this.form.controls);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: any = {
                name: this.form.value.name,
            };
            if (!R.isNil(this.form.value.annualConsumptionNT)) {
                form.annualConsumptionNT = parseFloat(this.form.value.annualConsumptionNT.replace(',', '.'));
            }
            if (!R.isNil(this.form.value.annualConsumptionVT)) {
                form.annualConsumptionVT = parseFloat(this.form.value.annualConsumptionVT.replace(',', '.'));
            }
            if (!R.isNil(this.form.value.annualConsumption)) {
                form.annualConsumption = parseFloat(this.form.value.annualConsumption.replace(',', '.'));
            }
            this.submitAction.emit(form);
        }
    }

    public setAnnualConsumptionNTState = (distributionRateId: string = null) => {
        const annualConsumptionNTControl = this.form.get('annualConsumptionNT');
        if (this.includesBothTariffs(distributionRateId)) {
            annualConsumptionNTControl.enable();
        } else {
            annualConsumptionNTControl.disable();
        }
    }
}
