import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';

import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointFormData,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
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
            url: '/secured/request/supply-point',
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/secured/request/offer-selection',
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: '/secured/dashboard',
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

    public submiSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let saveSupplyPoint;

        const supplyPoint: ISupplyPoint = R.pick(['id', 'supplierId', 'name', 'region', 'address', 'expirationDate'], supplyPointFormData);

        // todo pri mergy s naseptavacem adres
        supplyPoint.region = 'kraj';
        supplyPoint.subjectType =  'INDIVIDUAL';

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointFormData);
            saveSupplyPoint = this.supplyService.savePowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointFormData);
            saveSupplyPoint = this.supplyService.saveGasSupplyPoint(supplyPoint, gasAttributes);
        }

        saveSupplyPoint
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate(['/secured/request/offer-selection']);
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
