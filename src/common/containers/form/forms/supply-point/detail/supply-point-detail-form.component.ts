import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractSupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/abstract-supply-point-form.component';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    confirmFindNewSupplyPoint,
    confirmFindNewSupplyPointConfig,
    supplyPointDetailAllowedFields,
} from '../supply-point-form.config';
import {
    CONSTS,
    ROUTES,
    SUBJECT_TYPE_OPTIONS,
    TIME_TO_CONTRACT_END_PERIOD_MAP,
} from 'src/app/app.constants';

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
    public maxDaysTillContractExpiration = CONSTS.MAX_DAYS_TILL_CONTRACT_EXPIRATION;
    public suppliers = [];
    public subjectName = '';
    public setFormByCommodity = this.setFormFields;
    public timeToContractEndPeriodMap = TIME_TO_CONTRACT_END_PERIOD_MAP;
    public today = new Date().toISOString();

    constructor(
        protected fb: FormBuilder,
        private modalsService: ModalService,
        private router: Router,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.setFormByCommodity(this.commodityType[this.supplyPoint.commodityType]);
        this.setAnnualConsumptionNTState(this.supplyPoint.distributionRate && this.supplyPoint.distributionRate.code);
        this.subjectName = R.find(R.propEq('value', this.supplyPoint.subject.code))(SUBJECT_TYPE_OPTIONS).label;
        this.prefillFormData();

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed),
            )
            .subscribe(modal => {
                if (modal.modalType === confirmFindNewSupplyPoint) {
                    this.navigateToSupplyPoint(modal.data);
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.formSent && changes.formSent.currentValue === true) {
            this.setOriginalFormValues(this.form.value);
        }
    }

    public findNewSupplier = (supplyPoint: ISupplyPoint) => {
        const isDifferentForm = this.isDifferentForm();
        if (isDifferentForm) {
            this.modalsService
                .showModal$.next(confirmFindNewSupplyPointConfig(supplyPoint));
        } else {
            this.navigateToSupplyPoint(supplyPoint);
        }
    }

    public navigateToSupplyPoint = (supplyPoint: ISupplyPoint) => {
        const state = {
            supplyPointCopy: {
                ...supplyPoint,
            },
        };
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT], {state});
    }

    public prefillFormData = () => {
        let id = null;
        let commodityType = null;
        let name = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;

        if (!R.isEmpty(this.supplyPoint)) {
            id = this.supplyPoint.id;
            commodityType = this.supplyPoint.commodityType;
            name = this.supplyPoint.name;
            annualConsumptionVT = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
            annualConsumptionNT = this.supplyPoint.annualConsumptionNT &&
                this.supplyPoint.annualConsumptionNT.toString().replace('.', ',');
            annualConsumption = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
        }

        this.form.controls['id'].setValue(id);
        this.form.controls['commodityType'].setValue(commodityType);
        this.form.controls['name'].setValue(name);
        this.form.controls['annualConsumptionVT'].setValue(annualConsumptionVT);
        this.form.controls['annualConsumptionNT'].setValue(annualConsumptionNT);
        this.form.controls['annualConsumption'].setValue(annualConsumption);

        this.setOriginalFormValues(this.form.value);
        this.resetFormError(false);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: any = {
                ...this.form.value,
            };
            if (!R.isNil(this.form.value.annualConsumptionNT)) {
                form.annualConsumptionNT = parseFloat(this.form.value.annualConsumptionNT.toString().replace(',', '.'));
            }
            if (!R.isNil(this.form.value.annualConsumptionVT)) {
                form.annualConsumptionVT = parseFloat(this.form.value.annualConsumptionVT.toString().replace(',', '.'));
            }
            if (!R.isNil(this.form.value.annualConsumption)) {
                form.annualConsumption = parseFloat(this.form.value.annualConsumption.toString().replace(',', '.'));
            }
            this.submitAction.emit(form);
        }
    }
}
