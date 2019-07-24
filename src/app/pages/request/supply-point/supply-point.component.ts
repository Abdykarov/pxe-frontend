import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { getConfigStepper } from 'src/common/utils';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
import {
    ROUTES,
    SUPPLY_POINT_EDIT_TYPE,
} from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;
    public supplyPointData = null;
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;

    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);

    constructor(
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.supplyPointData = window.history.state.supplyPointCopy;
            this.editMode = SUPPLY_POINT_EDIT_TYPE.PROLONG;
        }
    }

    public submitSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let supplyPointAction;
        const id = supplyPointFormData.id;

        const supplyPoint: ISupplyPoint = R.pick([
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
            supplyPointAction = id ?
                this.supplyService.updatePowerSupplyPoint(id, supplyPoint, powerAttributes) :
                this.supplyService.createPowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointFormData);
            supplyPointAction = id ?
                this.supplyService.updateGasSupplyPoint(id, supplyPoint, gasAttributes) :
                this.supplyService.createGasSupplyPoint(supplyPoint, gasAttributes);
        }

        supplyPointAction
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({data}) => data.createPowerSupplyPoint ||
                        data.updatePowerSupplyPoint ||
                        data.createGasSupplyPoint ||
                        data.updateGasSupplyPoint,
                ),
            )
            .subscribe(
                (supplyPointId) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate(
                        [ROUTES.ROUTER_REQUEST_OFFER_SELECTION],
                        {
                            queryParams: {
                                supplyPointId,
                            },
                        });
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
