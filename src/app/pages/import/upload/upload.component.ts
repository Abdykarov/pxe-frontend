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
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApprovalConfig } from 'src/app/pages/import/approval/approval.config';
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
    graphQLMessages,
    importErrorCodes,
} from 'src/common/constants/errors.constant';
import {
    FileItem,
    FileUploader,
} from 'src/common/utils/file-upload';
import { fileUploaderFactory } from 'src/app/pages/import/upload/upload.config';
import {
    getConfigStepper,
    inArray,
    parseViolation,
    TypeStepper,
} from 'src/common/utils';
import {
    ImportProgressStep,
    IOfferImportInput,
} from 'src/app/pages/import/import.model';

@Component({
    selector: 'pxe-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG,
            useFactory: fileUploaderFactory,
            deps: [
                AuthService,
            ],
        },
    ],
})
export class UploadComponent extends AbstractComponent implements OnInit {
    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(ImportProgressStep.UPLOAD, false, TypeStepper.IMPORT);
    public readonly listOfErrorsHeaderText = 'Seznam chyb';
    public commodityType = CommodityType.POWER;
    public globalError: string[] = [];
    public fileErrors: string[] = [];
    public isInitState = true;
    public listOfErrors: string[] = [];
    public loading = false;
    public tryToUploadFile = false;

    constructor (
        private approvalConfig: ApprovalConfig,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(FILE_UPLOAD_CONFIG) private fileUploader: FileUploader,
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
            if (!inArray(type, CONSTS.ALLOWED_TYPE_OF_IMPORT_OFFERS_FILES)) {
                this.fileUploader.queue = [];
                this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.FILE_TYPE]];
                this.tryToUploadFile = false;
                return;
            }
            this.tryToUploadFile = true;
        };

        this.fileUploader.onCompleteItem = (item, response, status, header) => {
            this.loading = false;
            if (status === 200) {
                const allOffers = JSON.parse(response);

                let i = 1;
                const offersWithGoodCommodity = R.filter(({offerInput}) => {
                    offerInput.line = i;
                    i++;
                    if (this.commodityType === CommodityType.POWER) {
                        return offerInput.powerAttributes;
                    }
                    return offerInput.gasAttributes;
                })(allOffers);

                if (this.analyzeErrorsViolations(offersWithGoodCommodity)) {
                    return;
                }

                if (!offersWithGoodCommodity.length) {
                    this.globalError = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.NO_OFFERS_IN_IMPORT]];
                    this.isInitState = true;
                    this.fileUploader.clearQueue();
                } else {
                    this.router.navigate([ROUTES.ROUTER_IMPORT_APPROVAL], {
                        queryParams: {
                            commodityType: this.commodityType,
                        },
                        state: {
                            offers: offersWithGoodCommodity,
                        },
                    });
                }
            } else if (status === 401) {
                this.authService.logoutForced();
            } else if (status === 500) {
                const jsonResponse = JSON.parse(response);
                this.listOfErrors = [
                    jsonResponse.message,
                ];
                this.fileUploader.clearQueue();
            } else {
                this.isInitState = false;
                this.globalError = [defaultErrorMessage];
                this.fileUploader.clearQueue();
            }
            this.cd.markForCheck();
        };

    }

    uploadFile = (file: FileUploader) => {
        if (!this.tryToUploadFile) {
            return;
        }

        const numberOfFiles: number = R.path(['queue', 'length'], file) || 0;
        if (numberOfFiles === 0) {
            this.fileErrors = [defaultErrorMessage];
        } else if (numberOfFiles <= CONSTS.VALIDATORS.MAX_IMPORT_FILES) {
            this.fileErrors = [];
            this.loading = true;
            file.uploadItem(file.queue[0]);
        } else {
            this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.MAX_NUMBER_OF_FILES]];
        }
        this.cd.markForCheck();
    }

    downloadExampleImportFile = (evt) => {
        evt.preventDefault();
        if (isPlatformBrowser(this.platformId)) {
            window.open('/assets/csv/example-import-offers.csv');
        }
    }

    public analyzeErrorsViolations = (offersImportInput: IOfferImportInput[]): boolean => {
        this.listOfErrors = R.reduce((listOfErrors: string[], offerImportInput: IOfferImportInput) => {
            if (offerImportInput.violations.length) {
                R.forEach((violation: string) => {
                    listOfErrors.push(`Řádek ${offerImportInput.offerInput.line}: ${parseViolation(violation)}`);
                })(offerImportInput.violations);
            }
            return listOfErrors;
        }, [], offersImportInput);

        this.isInitState = false;
        this.fileUploader.clearQueue();
        this.cd.markForCheck();
        return !!this.listOfErrors.length;
    }
}
