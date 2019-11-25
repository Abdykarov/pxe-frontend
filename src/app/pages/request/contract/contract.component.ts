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
} from 'rxjs';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

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
    public pxeVerificationFormWrapper: PdfJsViewerComponent;

    @ViewChild('pdfInformation')
    public pdfInformation: any; // should be PdfJsViewerComponent ?

    @ViewChild('pdfContract')
    public pdfContract: any; // should be PdfJsViewerComponent ?

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
    public documentTypeContract = null;
    public documentTypeInformation = null;
    public documentTypeInformationURL = null;

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


    public documentTypeContractChild: ElementRef;

    @ViewChild('documentTypeContractChild')
    set content(documentTypeContractChild: ElementRef) {
        if (documentTypeContractChild) {
            this.documentTypeContractChild = documentTypeContractChild;
        }
    }

    ngOnInit () {
        super.ngOnInit();

        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.loadingSupplyPoint = false;
                    this.supplyPoint = supplyPoint;
                    this.navigateRequestService.checkCorrectStep(this.supplyPoint, ProgressStatus.READY_FOR_SIGN);
                    return combineLatest(
                        this.documentService.getDocument(supplyPoint.contract.contractId, this.documentType.INFORMATION),
                        this.documentService.getDocument(supplyPoint.contract.contractId, this.documentType.CONTRACT),
                    );
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([documentTypeInformation, documentTypeContract]) => {
                    this.documentTypeInformation = documentTypeInformation.file;
                    this.documentTypeContract = documentTypeContract.file;
                    this.loadingSupplyPoint = false;
                    this.cd.markForCheck();
                    setTimeout(() => {
                        this.showPdfs();
                    });
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public showPdfs = () => {
        if (this.pdfInformation) {
            this.pdfInformation.pdfSrc = this.documentTypeInformation;
            this.pdfInformation.refresh();
        }
        if (this.pdfContract) {
            this.pdfContract.pdfSrc = this.documentTypeContract;
            this.pdfContract.refresh();
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
                        // scrollToElementFnc(this.pxeVerificationFormWrapper.nativeElement);
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
