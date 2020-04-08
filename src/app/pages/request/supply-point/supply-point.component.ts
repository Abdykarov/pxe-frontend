import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as R from 'ramda';
import {
    concatMap,
    map,
    takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { getConfigStepper } from 'src/common/utils';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
import {
    ROUTES,
    SUPPLY_POINT_EDIT_TYPE,
} from 'src/app/app.constants';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { SupplyPointLocalStorageService } from 'src/app/services/supply-point-local-storage.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent implements OnInit {

    @ViewChild('pxeSupplyPointForm')
    public pxeSupplyPointForm: SupplyPointFormComponent;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public showBannerOfContinueInPreviousForm = false;
    public supplyPointData = null;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    public bannerObj: IBannerObj = {
        text: 'Chcete pokračovat v minulém rozpracovaném odběrném místě?',
    };

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        private supplyPointLocalStorageService: SupplyPointLocalStorageService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        let supplyPointCopy,
            supplyPointIdCopy;

        if (isPlatformBrowser(this.platformId)) {
            supplyPointCopy = window.history.state.supplyPointCopy;
            supplyPointIdCopy = window.history.state.supplyPointId;
        }

        this.editMode = supplyPointCopy || supplyPointIdCopy ? SUPPLY_POINT_EDIT_TYPE.PROLONG : SUPPLY_POINT_EDIT_TYPE.NORMAL;

        if (this.supplyPointId || supplyPointIdCopy) {
            let supplyPointFound: ISupplyPoint = null;
            this.supplyService.getSupplyPoint(this.supplyPointId || supplyPointIdCopy)
                .pipe(
                    map(({data}) => data.getSupplyPoint),
                    concatMap((supplyPoint: ISupplyPoint) => {
                        supplyPointFound = supplyPoint;
                        return R.path(['contract', 'contractId'])(supplyPoint) && R.isNil(supplyPointIdCopy) ?
                            this.contractService.deleteSelectedOfferFromContract(supplyPoint.contract.contractId) :
                            of({});
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe(
                    () => {
                        this.supplyPointData = supplyPointFound;
                        this.cd.markForCheck();
                    },
                    (error) => {
                        this.supplyPointData = {};
                        const { globalError } = parseGraphQLErrors(error);
                        this.globalError = globalError;
                        this.cd.markForCheck();
                    },
                );
        } else if (supplyPointCopy) {
            this.supplyPointData = supplyPointCopy;
        } else {
            this.showBannerOfContinueInPreviousForm = !R.isEmpty(this.supplyPointLocalStorageService.getSupplyPoint());
            this.supplyPointData = {};
        }
    }

    public continueInPreviousFormBannerAction = () => {
        this.supplyPointLocalStorageService.loadSupplyPointAction();
        this.showBannerOfContinueInPreviousForm = false;
    }

    public removePreviousFormBannerAction = () => {
        this.supplyPointLocalStorageService.removeSupplyPoint();
        this.showBannerOfContinueInPreviousForm = false;
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
                    'annualConsumptionNTUnit',
                    'annualConsumptionVT',
                    'annualConsumptionVTUnit',
                ], supplyPointFormData);
            supplyPointAction = id ?
                this.supplyService.updatePowerSupplyPoint(id, supplyPoint, powerAttributes) :
                this.supplyService.createPowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                    'annualConsumptionUnit',
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
                    this.supplyPointLocalStorageService.removeSupplyPoint();
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
                    this.supplyPointLocalStorageService.removeSupplyPoint();
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
