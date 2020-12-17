import {
    Component,
    Inject,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { askForOfferCodes } from 'src/common/constants/errors.constant';
import { FILE_UPLOAD_CONFIG } from 'src/app/app.constants';
import { FileItem } from 'src/third-sides/file-upload';
import { FileUploaderCustom } from 'src/third-sides/file-upload/file-uploader-custom';
import { fileUploaderFactory } from 'src/app/pages/import/upload/upload.config';
import { formFields } from './ask-for-offer-container.config';
import { inArray } from 'src/common/utils';

@Component({
    selector: 'pxe-ask-for-offer-container',
    templateUrl: './ask-for-offer-container.component.html',
    styleUrls: ['./ask-for-offer-container.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG,
            useFactory: fileUploaderFactory('ask-for-offer/send', 'files', true),
            deps: [
                AuthService,
            ],
        },
    ],
})
export class AskForOfferContainerComponent extends AbstractFormComponent implements OnInit {
    public readonly allowedMineTypes = this.CONSTS.ASK_FOR_OFFER.ALLOWED_MINE_TYPE;
    public readonly maxFileCount = this.CONSTS.ASK_FOR_OFFER.MAX_FILE_COUNT;
    public readonly maxFileSize = this.CONSTS.ASK_FOR_OFFER.MAX_FILE_SIZE;

    public errors: string[] = [];

    @Input()
    public id = 'file-upload';

    constructor(
        @Inject(FILE_UPLOAD_CONFIG) public fileUploader: FileUploaderCustom,
        protected fb: FormBuilder,
    ) {
        super(fb);
        this.formFields = formFields;
    }

    ngOnInit() {
        super.ngOnInit();
        this.fileUploader.onBeforeAddingFiles = (files: File[]) => {
            this.errors = [];
        };

        this.fileUploader.onAfterAddingFile = (fileItem: FileItem) => {
            const type = fileItem.file.type;
            if (fileItem.file.size > this.maxFileSize) {
                this.errors.push(askForOfferCodes[this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_SIZE]);
                this.fileUploader.removeFromQueue(fileItem);
                return;
            }
            if (!inArray(type, this.allowedMineTypes)) {
                this.fileUploader.removeFromQueue(fileItem);
                this.errors.push(askForOfferCodes[this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_TYPE]);
                return;
            }
            if (this.fileUploader.queue.length > this.CONSTS.ASK_FOR_OFFER.MAX_FILE_COUNT) {
                this.fileUploader.removeFromQueue(fileItem);
                this.errors.push(askForOfferCodes[this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_COUNT]);
                return;
            }
        };

    }

    public removeFile = (item) => this.fileUploader.removeFromQueue(item);

    public submitForm = (data) => {
        if (this.fileUploader.queue.length > 0 && this.form.valid) {
            this.fileUploader.uploadAllFiles({
                email: this.form.getRawValue().email,
            });
        }
    }
}
