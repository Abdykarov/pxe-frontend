import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
    ProgressStatus,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import { ContractActions } from '../models/supply-point-detail.model';
import { ContractDeleteReason } from 'src/common/graphql/models/contract';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { DocumentService } from 'src/app/services/document.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import {
    parseGraphQLErrors,
    parseRestAPIErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import {
    CONSTS,
    RequestsOverviewBannerShow,
    ROUTES,
    TIME_TO_CONTRACT_END_PERIOD_MAP,
} from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './supply-point-detail.component.html',
    styleUrls: ['./supply-point-detail.component.scss'],
})
export class SupplyPointDetailComponent extends AbstractComponent implements OnInit {
    public allowedOperations = AllowedOperations;
    public CommodityType = CommodityType;
    public dataLoading = true;
    public documentLoading = false;
    public documentType = IDocumentType;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public smsSent: number = null;
    public subjectType = SubjectType;
    public supplyPoint: ISupplyPoint = null;
    public nextSupplyPoint: ISupplyPoint = null;
    public contractId = this.route.snapshot.params.contractId;
    public supplyPointId = this.route.snapshot.params.supplyPointId;
    public contractAction: ContractActions = ContractActions.NONE;
    public contractActions = ContractActions;

    public contractActionsWrapper: ElementRef;
    public timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS;
    public timeToContractEndPeriod = TimeToContractEndPeriod.DAY;
    public timeToContractEndPeriodMap = TIME_TO_CONTRACT_END_PERIOD_MAP;

    @ViewChild('contractActionsWrapper') set content(contractActionsWrapper: ElementRef) {
        if (contractActionsWrapper) {
            this.contractActionsWrapper = contractActionsWrapper;
        }
    }

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private documentService: DocumentService,
        private navigateRequestService: NavigateRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.supplyService.getSupplyPoint(this.supplyPointId, this.contractId)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    const nextContractId = supplyPoint.contract.nextContractId;
                    return (nextContractId ? this.supplyService.getSupplyPoint(this.supplyPointId, nextContractId)
                        .pipe(
                            map(({data}) => data.getSupplyPoint),
                        ) : of({}));
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (nextSupplyPoint: ISupplyPoint) => {
                    if (!R.isEmpty(nextSupplyPoint)) {
                        this.nextSupplyPoint = nextSupplyPoint;
                    }
                    this.dataLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.dataLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public updateSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.formSent = false;
        this.globalError = [];
        this.fieldError = {};
        let updateSupplyPoint;

        const supplyPoint: ISupplyPoint = R.pick([
            'name',
        ], supplyPointFormData);

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'annualConsumptionNT',
                    'annualConsumptionNTUnit',
                    'annualConsumptionVT',
                    'annualConsumptionVTUnit',
                ], supplyPointFormData);
            updateSupplyPoint = this.supplyService.updatePowerSupplyPointWithContract(supplyPointFormData.id, supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'annualConsumption',
                    'annualConsumptionUnit',
                ], supplyPointFormData);
            updateSupplyPoint = this.supplyService.updateGasSupplyPointWithContract(supplyPointFormData.id, supplyPoint, gasAttributes);
        }

        updateSupplyPoint
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.formSent = true;
                    setTimeout(_ => {
                        this.formSent = false;
                        this.cd.markForCheck();
                    }, 5000);
                    scrollToElementFnc('top');
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    this.formSent = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public cancelUpdate = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }

    public sendContractConfirmationSms = () => {
        this.formLoading = true;
        this.contractService.sendContractConfirmationSms(this.supplyPoint.contract.contractId)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.smsSent = new Date().getTime();
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public submitVerification = (smsCode: string) => {
        this.formLoading = true;
        this.globalError = [];
        if (this.contractAction !== ContractActions.UNSET_PROLONGATION ) {
            this.contractService.deleteSignedContract(
                this.supplyPoint.contract.contractId,
                smsCode,
                this.contractAction === ContractActions.LEAVE_CONTRACT ? ContractDeleteReason.LEAVING : ContractDeleteReason.TERMINATION,
            )
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.deleteSignedContract),
            )
            .subscribe(
                (deleteSignedContract: boolean) => {
                    if (deleteSignedContract) {
                        this.router.navigate([
                                ROUTES.ROUTER_REQUESTS,
                            ],
                            {
                                state: {
                                    requestsOverviewBannerShow: this.contractAction === ContractActions.LEAVE_CONTRACT ?
                                        RequestsOverviewBannerShow.LEAVE_CONTRACT : RequestsOverviewBannerShow.TERMINATE_CONTRACT,
                                },
                            },
                        );
                    } else {
                        this.globalError = [defaultErrorMessage];
                        this.formLoading = false;
                        this.cd.markForCheck();
                    }
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError , fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    if (Object.keys(this.fieldError).length) {
                        scrollToElementFnc(this.contractActionsWrapper.nativeElement);
                    }
                    this.cd.markForCheck();
                },
            );
        } else {
            this.contractService.unsetContractProlongation(
                this.supplyPoint.id,
                this.supplyPoint.contract.contractId,
                smsCode,
            )
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
                map(({data}) => data.unsetContractProlongation),
            )
            .subscribe(
                (unsetContractProlongation: boolean) => {
                    if (unsetContractProlongation) {
                        // hotfix pred releaseme reformating PXEBR-87 by mohlo rozbit
                        this.supplyPoint.contract.prolong = false;
                        this.supplyPoint.allowedOperations = this.supplyPoint.allowedOperations.filter(
                            (allowedOperation: AllowedOperations) => allowedOperation !== AllowedOperations.UNSET_AUTOMATIC_PROLONGATION,
                        );

                        this.globalError = [];
                        this.formSent = true;
                        this.contractAction = ContractActions.NONE;
                        this.formLoading = false;
                        scrollToElementFnc('top');
                    } else {
                        this.globalError = [defaultErrorMessage];
                        this.formLoading = false;
                        this.cd.markForCheck();
                    }
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError , fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    if (Object.keys(this.fieldError).length) {
                        scrollToElementFnc(this.contractActionsWrapper.nativeElement);
                    }
                    this.cd.markForCheck();
                },
            );
        }
        this.cd.markForCheck();
    }

    public leaveContract = () => {
        this.contractAction = ContractActions.LEAVE_CONTRACT;
        this.smsSent = null;
        this.fieldError = {};
        this.globalError = [];
    }

    public terminateContract = () => {
        this.contractAction = ContractActions.TERMINATE_CONTRACT;
        this.smsSent = null;
        this.fieldError = {};
        this.globalError = [];
    }

    // public transferSupplyPoint = () => {
    //     this.contractAction = ContractActions.TRANSFER_SUPPLY_POINT;
    //     this.smsSent = null;
    //     this.fieldError = {};
    //     this.globalError = [];
    // }

    public interruptAutomaticProlongation = () => {
        this.contractAction = ContractActions.UNSET_PROLONGATION;
        this.smsSent = null;
        this.fieldError = {};
        this.globalError = [];
    }

    public saveDocument = (contractId: string, documentType: IDocumentType) => {
        this.documentLoading = true;
        this.globalError = [];
        this.documentService.getDocument(contractId, documentType)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.documentLoading = false;
                    this.documentService.documentSave(responseDataDocument);
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.documentLoading = false;
                    this.globalError.push(message);
                    this.cd.markForCheck();
                },
            );
    }

    // v pripade budouci zmeny
    public openDocument = (contractId: string, documentType: IDocumentType) => {
        const windowReference = window && window.open();
        this.documentLoading = true;
        this.globalError = [];
        this.documentService.getDocument(contractId, documentType)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.documentLoading = false;
                    const canBeClosed = this.documentService.documentOpen(responseDataDocument, windowReference);
                    if (windowReference && canBeClosed) {
                        windowReference.close();
                    }
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.documentLoading = false;
                    this.globalError.push(message);
                    if (windowReference) {
                        windowReference.close();
                    }
                    this.cd.markForCheck();
                },
            );
    }

    public routerToNextContract = (isNextContractConcluded: boolean) => {
        if (isNextContractConcluded) {
            this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS, this.nextSupplyPoint.id, this.nextSupplyPoint.contract.contractId]);
        } else {
            this.navigateRequestService.checkCorrectStep(this.nextSupplyPoint, ProgressStatus.COMPLETED);
        }
    }
}
