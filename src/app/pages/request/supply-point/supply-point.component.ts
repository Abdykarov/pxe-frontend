import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component, OnInit,
} from '@angular/core';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointFormData,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { ShowBannerComponent } from 'src/common/component/show-banner.component';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends ShowBannerComponent implements OnInit {
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public showBanner = false;

    public bannerObj: IBannerObj = {
        linkValue: '#',
        text: 'Vaše heslo bylo úspěšně změněno.',
        linkType: '',
        title: '',
    };

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
        protected cd: ChangeDetectorRef,
        protected route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super(cd, route);
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
            'contractEndTypeId',
            'timeToContractEnd',
            'timeToContractEndPeriodId',

        ], supplyPointFormData);

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'phasesId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointFormData);
            ean = powerAttributes.ean;
            saveSupplyPoint = this.supplyService.savePowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointFormData);
            ean = gasAttributes.eic;
            saveSupplyPoint = this.supplyService.saveGasSupplyPoint(supplyPoint, gasAttributes);
        }

        saveSupplyPoint
            .pipe(
                takeUntil(this.destroy$),
            )
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
