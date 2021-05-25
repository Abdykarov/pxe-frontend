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
import { saveAs } from 'file-saver';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApprovalConfig } from 'src/app/pages/suppliers/import/approval/approval.config';
import { AuthService } from 'src/app/services/auth.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    CONSTS,
    FILE_UPLOAD_CONFIG,
    ROUTES,
} from 'src/app/app.constants';
import {
    defaultErrorMessage,
    importErrorCodes,
} from 'src/common/constants/errors.constant';
import { DocumentService } from 'src/app/services/document.service';
import { environment } from 'src/environments/environment';
import {
    FileItem,
    FileUploader,
} from 'src/third-sides/file-upload';
import { fileUploaderFactory } from 'src/app/pages/suppliers/import/upload/upload.config';
import {
    getConfigStepper,
    inArray,
    parseViolation,
    scrollToElementFnc, transformHttpHeadersToFileUploaderFormat,
    TypeStepper,
} from 'src/common/utils';
import {
    ImportProgressStep,
    IOfferImportInput,
} from 'src/app/pages/suppliers/import/import.model';
import { ModalService } from 'src/common/containers/modal/modal.service';

@Component({
    selector: 'pxe-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG,
            useFactory: fileUploaderFactory('offer/batch-validate', 'offers', false),
            deps: [
                AuthService,
            ],
        },
    ],
})
export class UploadComponent extends AbstractComponent implements OnInit {
    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(ImportProgressStep.UPLOAD, false, TypeStepper.IMPORT);
    public commodityType = CommodityType.POWER;
    public fileErrors: string[] = [];
    public globalError: string[] = [];
    public isInitState = true;
    public errorInParsing = false;
    public listOfErrors: string[] = [];
    public loading = false;
    public tryToUploadFile = false;

    @ViewChild('listOfNotificationsRow')
    public listOfNotificationsRow: ElementRef;

    constructor (
        private approvalConfig: ApprovalConfig,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private documentService: DocumentService,
        private modalsService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(FILE_UPLOAD_CONFIG) public fileUploader: FileUploader,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.commodityType = params['commodityType'];
                if (!this.commodityType || !CommodityType[this.commodityType]) {
                    this.commodityType = CommodityType.POWER;
                }
            });
    }

    ngOnInit(): void {
        this.fileUploader.onAfterAddingFile = (fileItem: FileItem) => {
            this.globalError = [];
            const fileName = fileItem._file.name;
            const type = fileName.substr(fileName.lastIndexOf('.') + 1);
            if (!inArray(type, CONSTS.ALLOWED_TYPE_OF_IMPORT_OFFERS_FILES) || type === fileName) {
                this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.FILE_TYPE]];
                this.fileUploader.clearQueue();
                this.tryToUploadFile = false;
            } else {
                this.tryToUploadFile = true;
            }
        };

        this.fileUploader.onCompleteItem = (item, response, status, header) => {
            this.loading = false;
            this.errorInParsing = false;
            if (status === 200) {
                const offers: IOfferImportInput[] = JSON.parse(response);
                this.listOfErrors = this.getErrorsViolations(offers);
                if (this.listOfErrors.length) {
                    this.isInitState = false;
                } else {
                    if (!offers.length) {
                        this.globalError = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.NO_OFFERS_IN_IMPORT]];
                        this.isInitState = true;
                    } else {
                        this.router.navigate([ROUTES.ROUTER_IMPORT_APPROVAL_POWER], {
                            state: {
                                offers,
                                commodityTypeAfterApprove: this.commodityType,
                            },
                        });
                    }
                }
            } else if (status === 401) {
                this.authService.logoutForced();
            } else if (status === 500) {
                this.errorInParsing = true;
                this.isInitState = true;
            } else {
                this.isInitState = false;
                this.globalError = [defaultErrorMessage];
            }
            this.fileUploader.clearQueue();
            this.cd.markForCheck();
        };
    }

    public uploadFile = (fileUploader: FileUploader) => {
        if (this.tryToUploadFile) {
            const countOfFiles: number = R.path(['queue', 'length'], fileUploader) || 0;
            if (countOfFiles === 0) {
                this.fileErrors = [defaultErrorMessage];
                this.fileUploader.clearQueue();
            } else if (countOfFiles <= CONSTS.VALIDATORS.MAX_IMPORT_FILES) {
                const newSetting = {
                    url: `${environment.url_api}/v1.0/offer/batch-validate`,
                    itemAlias: 'offers',
                    headers: transformHttpHeadersToFileUploaderFormat(this.authService.getAuthorizationHeaders(null, '*/*', false)),
                };
                this.fileUploader.setOptions(newSetting);
                this.fileErrors = [];
                this.loading = true;
                R.forEach((fileItem: FileItem) => {
                    fileUploader.uploadItem(fileItem);
                }, fileUploader.queue);
            } else {
                this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.MAX_NUMBER_OF_FILES]];
                this.fileUploader.clearQueue();
            }
            this.cd.markForCheck();
        }
    }

    public downloadExampleImportFile = (evt) => {
        evt.preventDefault();
        if (isPlatformBrowser(this.platformId)) {
            saveAs(CONSTS.EXAMPLE_OF_IMPORT_OFFER_FILE.PATH, CONSTS.EXAMPLE_OF_IMPORT_OFFER_FILE.FILE_NAME);
        }
    }

    public scrollToErrors = (evt) => {
        evt.preventDefault();
        scrollToElementFnc(this.listOfNotificationsRow.nativeElement);
    }

    public getErrorsViolations = (offersImportInput: IOfferImportInput[]): string[] => {
        let row = 2;
        return R.reduce((listOfErrors: string[], offerImportInput: IOfferImportInput) => {
            if (offerImportInput.violations.length) {
                R.forEachObjIndexed((violation: string) => {
                    listOfErrors.push(`Řádek ${row}: ${parseViolation(violation)}`);
                })(offerImportInput.violations);
            }
            row++;
            return listOfErrors;
        }, [], offersImportInput);
    }
}
