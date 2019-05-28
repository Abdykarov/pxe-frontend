import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointFormData,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent {
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: ROUTES.ROUTER_REQUEST_SUPPLY_POINT,
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            url: ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: ROUTES.ROUTER_DASHBOARD,
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public submitSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let saveSupplyPoint;
        let ean = '';

        const supplyPoint: ISupplyPoint = R.pick([
            'id',
            'supplierId',
            'name',
            'address',
            'expirationDate',
            'subjectTypeId',
        ], supplyPointFormData);

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointFormData);
            ean = powerAttributes.ean;
            saveSupplyPoint = this.supplyService.savePowerSupplyPoint(supplyPoint, powerAttributes)
                .pipe(
                    takeUntil(this.destroy$),
                );
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointFormData);
            ean = gasAttributes.eic;
            saveSupplyPoint = this.supplyService.saveGasSupplyPoint(supplyPoint, gasAttributes)
                .pipe(
                    takeUntil(this.destroy$),
                );
        }

        saveSupplyPoint
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate([ROUTES.ROUTER_REQUEST_OFFER_SELECTION, {
                        ean,
                    }]);
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
