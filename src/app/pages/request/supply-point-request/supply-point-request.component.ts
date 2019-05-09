import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointInput,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point-request.component.html',
    styleUrls: ['./supply-point-request.component.scss'],
})
export class SupplyPointRequestComponent extends AbstractComponent {
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
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
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public submiSupplyForm = (supplyPointInput: ISupplyPointInput) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        const supplyPoint: ISupplyPoint = R.pick(['id', 'supplierId', 'name', 'region', 'address', 'expirationDate'], supplyPointInput);

        // todo pri mergy s naseptavacem adres
        supplyPoint.region = 'kraj';
        supplyPoint.subjectType =  'INDIVIDUAL';

        if (supplyPointInput.commodityType === 'POWER') {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointInput);

            this.savePowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointInput);

            this.saveGasSupplyPoint(supplyPoint, gasAttributes);
        }
    }

    private savePowerSupplyPoint(supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointPowerAttributes) {
        this.supplyService.savePowerSupplyPoint(supplyPoint, gasAttributes)
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

    private saveGasSupplyPoint(supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) {
        this.supplyService.saveGasSupplyPoint(supplyPoint, gasAttributes)
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
