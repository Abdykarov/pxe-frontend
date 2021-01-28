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
    combineLatest,
    of,
} from 'rxjs';
import {
    map,
    retry,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';
import { AuthService } from 'src/app/services/auth.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import {
    CONSTS,
    GTM_CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { DocumentService } from 'src/app/services/document.service';
import { FaqService } from 'src/app/services/faq.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
    parseRestAPIErrors,
    removeAccent,
    scrollToElementFnc,
} from 'src/common/utils';
import { GTMService } from 'src/app/services/gtm.service';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { PdfViewerComponent } from 'src/common/ui/pdf-viewer/pdf-viewer.component';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends AbstractFaqComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.READY_FOR_SIGN;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.PERSONAL_DATA;
    public readonly BannerTypeImages = BannerTypeImages;

    @ViewChild('pxeVerificationFormWrapper')
    public pxeVerificationFormWrapper: ElementRef;

    @ViewChild('pdfInformation')
    public pdfInformation: PdfViewerComponent;

    @ViewChild('pdfContract')
    public pdfContract: PdfViewerComponent;

    public pdfStopProlongation: PdfViewerComponent;

    @ViewChild('pdfStopProlongation')
    set setPdfStopProlongation(pdfStopProlongation: PdfViewerComponent) {
        if (pdfStopProlongation) {
            this.pdfStopProlongation = pdfStopProlongation;
        }
    }

    public commodityType = CommodityType;
    public configStepper = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public documentLoading = false;
    public documentType = IDocumentType;
    public documentTypeContract: IResponseDataDocument = null;
    public documentTypeInformation: IResponseDataDocument = null;
    public documentTypeUnsetProlongation: IResponseDataDocument = null;
    public fieldError: IFieldError = {};
    public formLoading = false;
    public globalError: string[] = [];
    public loadingSupplyPoint = true;
    public showErrorMessageWithLoadingContracts = false;
    public showOffer = true;
    public smsSent: number = null;
    public subjectType = SubjectType;
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private documentService: DocumentService,
        public faqService: FaqService,
        private gtmService: GTMService,
        public navigateRequestService: NavigateRequestService,
        public route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super(faqService, route);
        this.gtmService.loadFormEvent(GTM_CONSTS.LABELS.STEP_FIVE, this.authService.hashedUserId);
    }

    ngOnInit () {
        super.ngOnInit();

        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                _ => this.cd.markForCheck(),
            );

        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;

                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.CHECKOUT,
                        ecommerce: {
                            checkout: {
                                actionField: {
                                    step: 2,
                                },
                            },
                        },
                    });

                    const documentTypeInformation$ = this.supplyPoint.subject.code === this.subjectType.SUBJECT_TYPE_INDIVIDUAL ?
                        this.documentService.getDocument(this.supplyPoint.contract.contractId, this.documentType.INFORMATION)
                            .pipe(retry(CONSTS.CONTRACT_SIGN_NUMBER_OF_RETRY)) :
                        of(
                            {
                                file: null,
                                filename: null,
                            },
                        );

                    const documentTypeContract$ =
                        this.documentService.getDocument(this.supplyPoint.contract.contractId, this.documentType.CONTRACT)
                            .pipe(retry(CONSTS.CONTRACT_SIGN_NUMBER_OF_RETRY));

                    const showUnsetProlongation = !!this.supplyPoint.contract.previousContractId;
                    const documentTypeUnsetProlongation$ = showUnsetProlongation ?
                            this.documentService.getDocument(
                                    this.supplyPoint.contract.contractId,
                                    this.documentType.CONTRACT_NOT_EXTENDED,
                                )
                                .pipe(retry(CONSTS.CONTRACT_SIGN_NUMBER_OF_RETRY)) : of(null);

                    this.navigateRequestService.checkCorrectStep(this.supplyPoint, ProgressStatus.READY_FOR_SIGN);
                    return combineLatest([documentTypeInformation$, documentTypeContract$, documentTypeUnsetProlongation$]);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([documentTypeInformation, documentTypeContract, documentTypeUnsetProlongation]) => {
                    this.documentTypeInformation = documentTypeInformation;
                    this.documentTypeContract = documentTypeContract;
                    if (documentTypeUnsetProlongation) {
                        this.documentTypeUnsetProlongation = documentTypeUnsetProlongation;
                    }
                    this.loadingSupplyPoint = false;
                    this.cd.markForCheck();
                    setTimeout(() => {
                        this.showPdfs();
                        this.cd.markForCheck();
                    });
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.showErrorMessageWithLoadingContracts = true;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public showPdfs = () => {
        if (this.pdfInformation) {
            this.pdfInformation.pdfSrc = this.documentTypeInformation.file;
            this.pdfInformation.downloadFileName = this.documentTypeInformation.filename;
            this.pdfInformation.refresh();
        }
        if (this.pdfContract) {
            this.pdfContract.pdfSrc = this.documentTypeContract.file;
            this.pdfContract.downloadFileName = this.documentTypeContract.filename;
            this.pdfContract.refresh();
        }

        if (this.pdfStopProlongation) {
            this.pdfStopProlongation.pdfSrc = this.documentTypeUnsetProlongation.file;
            this.pdfStopProlongation.downloadFileName = this.documentTypeUnsetProlongation.filename;
            this.pdfStopProlongation.refresh();
        }
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
                        this.gtmService.pushEvent({
                            'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
                            'category': GTM_CONSTS.CATEGORIES.FORM,
                            'dodavatel': removeAccent(this.supplyPoint?.contract?.offer?.supplier?.name).toLowerCase(),
                            'action': GTM_CONSTS.ACTIONS.SIGN,
                            'label': GTM_CONSTS.LABELS.STEP_FIVE,
                            'userID': this.authService.hashedUserId,
                        });
                        this.router.navigate(
                            [ROUTES.ROUTER_REQUEST_PAYMENT], {
                                queryParams: {
                                    supplyPointId: this.supplyPointId,
                                },
                            });
                    } else {
                        this.globalError = [defaultErrorMessage];
                        this.formLoading = false;
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

    public redirectToRequest = () => {
        this.router.navigate([ROUTES.ROUTER_REQUESTS]);
    }
}
