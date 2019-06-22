import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';

import { AbstractSupplyPointFormComponent } from '../abstract-supply-point-form.component';
import {
    SUBJECT_TYPE_OPTIONS,
    TIME_TO_CONTRACT_END_PERIOD_MAP,
} from 'src/app/app.constants';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    supplyDetailInfoBanner,
    supplyPointDetailAllowedFields,
} from '../supply-point-form.config';

@Component({
    selector: 'pxe-supply-point-detail-form',
    templateUrl: './supply-point-detail-form.component.html',
    styleUrls: ['./supply-point-detail-form.component.scss'],
})
export class SupplyPointDetailFormComponent extends AbstractSupplyPointFormComponent implements OnInit, OnChanges {
    @Input()
    public supplyPoint: ISupplyPoint;

    public allowedFields = supplyPointDetailAllowedFields;
    public commodityType = CommodityType;
    public suppliers = [];
    public supplyDetailInfoBanner = supplyDetailInfoBanner;
    public subjectName = '';
    public timeToContractEndPeriodMap = TIME_TO_CONTRACT_END_PERIOD_MAP;
    public setFormByCommodity = this.setFormFields;

    constructor(
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
        let id = null;
        let name = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;

        if (!R.isEmpty(this.supplyPoint)) {
            id = this.supplyPoint.id;
            name = this.supplyPoint.name;
            annualConsumptionVT = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
            annualConsumptionNT = this.supplyPoint.annualConsumptionNT &&
                this.supplyPoint.annualConsumptionNT.toString().replace('.', ',');
            annualConsumption = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
        }

        this.form.controls['id'].setValue(id);
        this.form.controls['name'].setValue(name);
        this.form.controls['annualConsumptionVT'].setValue(annualConsumptionVT);
        this.form.controls['annualConsumptionNT'].setValue(annualConsumptionNT);
        this.form.controls['annualConsumption'].setValue(annualConsumption);

        this.resetFormError(false);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: any = {
                id: this.form.value.id,
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
}
