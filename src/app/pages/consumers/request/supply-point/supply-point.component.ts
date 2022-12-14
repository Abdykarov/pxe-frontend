import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as R from 'ramda';
import { of } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import {
    GTM_CONSTS,
    SUPPLY_POINT_EDIT_TYPE,
    S_ANALYTICS,
} from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { GTMService } from 'src/app/services/gtm.service';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SupplyPointLocalStorageService } from 'src/app/services/supply-point-local-storage.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { getConfigStepper, parseGraphQLErrors } from 'src/common/utils';

@Component({
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent implements OnInit {
    @ViewChild('pxeSupplyPointForm')
    public pxeSupplyPointForm: SupplyPointFormComponent;

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    private deteledContractId = null;
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields(
        this.authService.currentUserValue.testingAccount
    );
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(
        this.ACTUAL_PROGRESS_STATUS
    );
    public showBannerOfContinueInPreviousForm = false;
    public supplyPointData = null;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    public bannerObj: IBannerObj = {
        text: 'Evidujeme u v??s nedokon??en?? odb??rn?? m??sto, chcete na????st tyto ??daje?',
    };

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private cryptoService: CryptoService,
        private gtmService: GTMService,
        private navigateConsumerService: NavigateConsumerService,
        private route: ActivatedRoute,
        private router: Router,
        private sAnalyticsService: SAnalyticsService,
        private supplyService: SupplyService,
        private supplyPointLocalStorageService: SupplyPointLocalStorageService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();
        this.gtmService.loadFormEvent(
            GTM_CONSTS.LABELS.STEP_TWO,
            this.cryptoService.hashedUserId
        );
    }

    ngOnInit() {
        let supplyPointCopy, supplyPointIdCopy;

        if (isPlatformBrowser(this.platformId)) {
            supplyPointCopy = window.history.state.supplyPointCopy;
            supplyPointIdCopy = window.history.state.supplyPointId;
        }

        this.editMode =
            supplyPointCopy || supplyPointIdCopy
                ? SUPPLY_POINT_EDIT_TYPE.PROLONG
                : SUPPLY_POINT_EDIT_TYPE.NORMAL;

        // There are 3 types of create | update supply point
        // 1. New supply point =>  this.supplyPointId && supplyPointIdCopy == false
        // 2. NON_CONCLUDED supply point. (from backStep) => this.supplyPointId
        // 3. Prolongation from overview or detail supply point. In this situation form is prefill with previous values. supplyPointIdCopy
        if (this.supplyPointId || supplyPointIdCopy) {
            let supplyPointFound: ISupplyPoint = null;
            this.supplyService
                .getSupplyPoint(this.supplyPointId || supplyPointIdCopy)
                .pipe(
                    map(({ data }) => data.getSupplyPoint),
                    concatMap((supplyPoint: ISupplyPoint) => {
                        if (supplyPoint.imported) {
                            return of(supplyPoint);
                        }

                        supplyPointFound = supplyPoint;
                        if (this.deteledContractId) {
                            return of({});
                        } else {
                            this.deteledContractId =
                                R.path(['contract', 'contractId'])(
                                    supplyPoint
                                ) && R.isNil(supplyPointIdCopy);
                            return this.deteledContractId
                                ? this.contractService.deleteSelectedOfferFromContract(
                                      supplyPoint.contract.contractId
                                  )
                                : of({});
                        }
                    }),
                    concatMap((supplyPoint: ISupplyPoint) => {
                        if (supplyPoint.imported) {
                            return of(supplyPoint);
                        }

                        return this.deteledContractId
                            ? this.supplyService
                                  .getSupplyPoint(this.supplyPointId)
                                  .pipe(map(({ data }) => data.getSupplyPoint))
                            : of({});
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    (supplyPoint: ISupplyPoint) => {
                        this.supplyPointLocalStorageService.isEdit = true;
                        this.supplyPointData = supplyPoint || supplyPointFound;
                        this.cd.markForCheck();
                    },
                    (error) => {
                        this.supplyPointLocalStorageService.isEdit = true;
                        this.supplyPointData = {};
                        const { globalError } = parseGraphQLErrors(error);
                        this.globalError = globalError;
                        this.cd.markForCheck();
                    }
                );
        } else if (supplyPointCopy) {
            this.supplyPointLocalStorageService.isEdit = true;
            this.supplyPointData = supplyPointCopy;
        } else {
            this.supplyPointLocalStorageService.isEdit = false;
            this.showBannerOfContinueInPreviousForm = !R.isEmpty(
                this.supplyPointLocalStorageService.getSupplyPoint()
            );
            this.supplyPointData = {};
        }
    }

    public continueInPreviousFormBannerAction = () => {
        this.supplyPointLocalStorageService.loadSupplyPointAction();
        this.showBannerOfContinueInPreviousForm = false;
    };

    public removePreviousFormBannerAction = () => {
        this.supplyPointLocalStorageService.removeSupplyPoint();
        this.showBannerOfContinueInPreviousForm = false;
    };

    public submitSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let supplyPointAction;
        const id = supplyPointFormData.id;

        const supplyPoint: ISupplyPoint = R.pick(
            [
                'supplierId',
                'name',
                'address',
                'expirationDate',
                'subjectTypeId',
                'contractEndTypeId',
                'timeToContractEnd',
                'timeToContractEndPeriodId',
                'withoutSupplier',
            ],
            supplyPointFormData
        );

        if (supplyPoint.withoutSupplier) {
            supplyPoint.expirationDate = moment().format('YYYY-MM-DD');
        }

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes = R.pick(
                [
                    'ean',
                    'circuitBreakerId',
                    'phasesId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionNTUnit',
                    'annualConsumptionVT',
                    'annualConsumptionVTUnit',
                ],
                supplyPointFormData
            );
            supplyPointAction =
                id && !this.supplyPointData?.imported
                    ? this.supplyService.updatePowerSupplyPoint(
                          id,
                          supplyPoint,
                          powerAttributes
                      )
                    : this.supplyService.createPowerSupplyPoint(
                          supplyPoint,
                          powerAttributes
                      );
        } else {
            const gasAttributes: ISupplyPointGasAttributes = R.pick(
                ['eic', 'annualConsumption', 'annualConsumptionUnit'],
                supplyPointFormData
            );
            supplyPointAction =
                id && !this.supplyPointData?.imported
                    ? this.supplyService.updateGasSupplyPoint(
                          id,
                          supplyPoint,
                          gasAttributes
                      )
                    : this.supplyService.createGasSupplyPoint(
                          supplyPoint,
                          gasAttributes
                      );
        }

        supplyPointAction
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({ data }) =>
                        data.createPowerSupplyPoint ||
                        data.updatePowerSupplyPoint ||
                        data.createGasSupplyPoint ||
                        data.updateGasSupplyPoint
                )
            )
            .subscribe(
                (supplyPointId) => {
                    this.supplyPointLocalStorageService.removeSupplyPoint();
                    this.formLoading = false;
                    this.formSent = true;
                    this.sAnalyticsService.sendWebData(
                        {},
                        {
                            email: this.authService.currentUserValue.email,
                        },
                        {},
                        {
                            ACTION: S_ANALYTICS.ACTIONS.CREATE_SUPPLY_POINT,
                            supplyPointFormData,
                        }
                    );
                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        category: GTM_CONSTS.CATEGORIES.FORM,
                        action: GTM_CONSTS.ACTIONS.SAVE,
                        label: GTM_CONSTS.LABELS.STEP_TWO,
                        odberatel:
                            (<any>supplyPoint)?.subjectTypeId ===
                            SubjectType.SUBJECT_TYPE_INDIVIDUAL
                                ? 'domacnost'
                                : 'firma',
                        energie:
                            supplyPointFormData?.commodityType?.toLowerCase(),
                        userID: this.cryptoService?.hashedUserId,
                    });
                    this.cd.markForCheck();
                    this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                        ProgressStatus.OFFER_STEP,
                        {
                            supplyPointId,
                        }
                    );
                },
                (error) => {
                    this.supplyPointLocalStorageService.removeSupplyPoint();
                    this.formLoading = false;
                    const { fieldError, globalError } =
                        parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    };
}
