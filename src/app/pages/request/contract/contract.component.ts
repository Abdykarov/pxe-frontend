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

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { DocumentService } from 'src/app/services/document.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
    parseRestAPIErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.READY_FOR_SIGN;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.PERSONAL_DATA;

    @ViewChild('pxeVerificationFormWrapper')
    public pxeVerificationFormWrapper: ElementRef;

    public commodityType = CommodityType;
    public configStepper = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public documentLoading = false;
    public documentType = IDocumentType;
    public fieldError: IFieldError = {};
    public formLoading = false;
    public globalError: string[] = [];
    public loadingSupplyPoint = true;
    public showOffer = true;
    public smsSent: number = null;
    public subjectType = SubjectType;
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private documentService: DocumentService,
        public navigateRequestService: NavigateRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();

        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (supplyPoint: ISupplyPoint) => {
                    this.loadingSupplyPoint = false;
                    this.supplyPoint = supplyPoint;
                    this.navigateRequestService.checkCorrectStep(this.supplyPoint, ProgressStatus.READY_FOR_SIGN);
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public openDocument(contractId: string, documentType: IDocumentType) {
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

    public toggleOffer = () => {
        this.showOffer = !this.showOffer;
    }

    public chooseNewOfferAction = (evt) => {
        evt.preventDefault();
        this.navigateRequestService.routerToRequestStep(this.supplyPoint, ProgressStatus.OFFER_STEP);
    }

    public signContract(smsCode: string) {
        this.formLoading = true;
        this.globalError = [];
        this.contractService.signContract(
                this.supplyPoint.contract.contractId,
                smsCode,
            )
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.signContract),
            )
            .subscribe(
                (deleteSignedContract: boolean) => {
                    if (deleteSignedContract) {
                        this.router.navigate(
                            [ROUTES.ROUTER_REQUEST_PAYMENT], {
                                queryParams: {
                                    supplyPointId: this.supplyPointId,
                                },
                            });
                    } else {
                        this.globalError = [defaultErrorMessage];
                        this.cd.markForCheck();
                    }
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    if (Object.keys(this.fieldError).length) {
                        scrollToElementFnc(this.pxeVerificationFormWrapper.nativeElement);
                    }
                    this.cd.markForCheck();
                },
            );
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
}
