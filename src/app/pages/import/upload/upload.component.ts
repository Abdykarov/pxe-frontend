import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';

import * as R from 'ramda';
import {
    FileItem,
    FileUploader,
} from 'ng2-file-upload';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CONSTS } from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    defaultErrorMessage,
    importErrorCodes,
} from 'src/common/constants/errors.constant';
import {
    FILE_UPLOAD_CONFIG,
    FileUploadService,
} from 'src/app/services/file-upload.service';
import { fileUploaderOptions } from 'src/app/pages/import/upload/upload.config';
import {
    getConfigStepper,
    inArray,
    TypeStepper,
} from 'src/common/utils';
import { ImportProgressStep } from 'src/app/pages/import/import.model';
// add refresh atd...
@Component({
    selector: 'pxe-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG,
            useValue: fileUploaderOptions,
        },
        FileUploadService,
    ],
})
export class UploadComponent extends AbstractComponent implements OnInit {
    public readonly configStepper = getConfigStepper(ImportProgressStep.UPLOAD, false, TypeStepper.IMPORT);
    public readonly listOfErrorsHeaderText = 'Seznam chyb';
    public bannerTypeImages = BannerTypeImages;
    public commodityType = CommodityType.POWER;
    public fileErrors: string[] = [];
    public isInitState = true;
    public listOfErrors = [];
    public tryToUploadFile = false;

    constructor (
        private fileUploadService: FileUploadService,
        private route: ActivatedRoute,
        private router: Router,
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
        this.fileUploadService.fileUploader.onAfterAddingFile = (fileItem: FileItem) => {
            const fileName = fileItem._file.name;
            const type = fileName.substr(fileName.lastIndexOf('.') + 1);
            if (!inArray(type, CONSTS.ALLOWED_TYPE_OF_IMPORT_FILES)) {
                this.fileUploadService.fileUploader.queue = [];
                this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.FILE_TYPE]];
                this.tryToUploadFile = false;
                return;
            }
            this.tryToUploadFile = true;
        };

        this.fileUploadService.fileUploader.onCompleteItem = (item, response, status, header) => {
            if (status === 200) {
                this.isInitState = false;
                this.listOfErrors = [
                    'Řádek 1, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
                    'Řádek 1, buňka F (cena za VF): pole není vyplněno',
                    'Řádek 2, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
                    'Řádek 2, buňka F (cena za VF): pole není vyplněno',
                ];
                this.fileUploadService.fileUploader.clearQueue();
            } else if (status === 401) {
            } else {
                this.isInitState = false;
                this.fileUploadService.fileUploader.clearQueue();
            }
            // console.log(item);
            // console.log(response);
            // console.log(status);
            // console.log(header);
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
            file.uploadItem(file.queue[0]);
        } else {
            this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.MAX_NUMBER_OF_FILES]];
        }
    }

    downloadExampleImportFile = (evt) => {
        evt.preventDefault();
        if (isPlatformBrowser(this.platformId)) {
            window.open('/assets/csv/example-import-offers.csv');
        }
    }
}
