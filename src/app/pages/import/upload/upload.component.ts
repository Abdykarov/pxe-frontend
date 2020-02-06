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
import { CONSTS } from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    defaultErrorMessage,
    importErrorCodes,
} from 'src/common/constants/errors.constant';
import { fileUploaderOptions } from 'src/app/pages/import/upload/upload.config';
import { FILE_UPLOAD_CONFIG, FileUploadService } from 'src/app/services/file-upload.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    getConfigStepper,
    inArray,
    TypeStepper,
} from 'src/common/utils';
import { ImportProgressStep } from 'src/app/pages/import/import.model';

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
    public fileErrors: string[] = [];
    public tryToUploadFile = false;
    public bannerTypeImages = BannerTypeImages;
    public listOfErrors = [
        'Řádek 1, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
        'Řádek 1, buňka F (cena za VF): pole není vyplněno',
        'Řádek 2, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
        'Řádek 2, buňka F (cena za VF): pole není vyplněno',
    ];

    public commodityType = CommodityType.POWER;

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
            if (!inArray(type, CONSTS.ALLOWED_TYOE_OF_IMPORT_FILES)) {
                this.fileUploadService.fileUploader.queue = [];
                this.fileErrors = [importErrorCodes[CONSTS.IMPORT_ERROR_CODES.FILE_TYPE]];
                this.tryToUploadFile = false;
                return;
            }
            this.tryToUploadFile = true;
        };

        this.fileUploadService.fileUploader.onCompleteItem = (item, response, status, header) => {
            console.log('onCompleteItem');
        };

    }

    uploadFile = (file: FileUploader) => {
        console.log('tryToUploadFile2');
        console.log(this.tryToUploadFile);
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
