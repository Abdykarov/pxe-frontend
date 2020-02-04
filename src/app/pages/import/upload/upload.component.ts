import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { takeUntil } from 'rxjs/operators';

import { ImportProgressStep } from 'src/app/pages/import/import.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { getConfigStepper, TypeStepper } from 'src/common/utils';

@Component({
    selector: 'pxe-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends AbstractComponent implements OnInit {
    public readonly configStepper = getConfigStepper(ImportProgressStep.UPLOAD, false, TypeStepper.IMPORT);
    public readonly listOfErrorsHeaderText = 'Seznam chyb';
    public listOfErrors = [
        'Řádek 1, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
        'Řádek 1, buňka F (cena za VF): pole není vyplněno',
        'Řádek 2, buňka D (distribuční sazba): pole je vyplněno, ale hodnota není správná',
        'Řádek 2, buňka F (cena za VF): pole není vyplněno',
    ];

    public commodityType = CommodityType.POWER;

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean;
    hasAnotherDropZoneOver: boolean;
    response: string;

    constructor (
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

        this.uploader = new FileUploader({
            url: <any>URL,
            disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
            formatDataFunctionIsAsync: true,
            formatDataFunction: async (item) => {
                return new Promise( (resolve, reject) => {
                    resolve({
                        name: item._file.name,
                        length: item._file.size,
                        contentType: item._file.type,
                        date: new Date(),
                    });
                });
            },
        });

        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;

        this.response = '';

        this.uploader.response.subscribe( res => this.response = res );
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    ngOnInit(): void {
    }

    downloadExampleImportFile = (evt) => {
        evt.preventDefault();
        if (isPlatformBrowser(this.platformId)) {
            window.open('/assets/csv/example-import-offers.csv');
        }
    }
}
