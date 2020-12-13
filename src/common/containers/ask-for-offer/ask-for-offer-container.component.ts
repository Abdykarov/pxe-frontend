import {
    Component,
    Inject, OnInit,
} from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS, FILE_UPLOAD_CONFIG } from 'src/app/app.constants';
import { fileUploaderFactory } from 'src/app/pages/import/upload/upload.config';
import { FileItem, FileUploader } from 'src/third-sides/file-upload';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../form/abstract-form.component';
import { errorFieldMessages } from '../../constants/errors.constant';
import { inArray } from '../../utils';
import { FileUploaderCustom } from 'src/third-sides/file-upload/file-uploader-custom';

@Component({
    selector: 'pxe-ask-for-offer-container',
    templateUrl: './ask-for-offer-container.component.html',
    styleUrls: ['./ask-for-offer-container.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG,
            useFactory: fileUploaderFactory('ask-for-offer/send', 'files', false),
            deps: [
                AuthService,
            ],
        },
    ],
})
export class AskForOfferContainerComponent extends AbstractFormComponent implements OnInit {

    constructor(
        @Inject(FILE_UPLOAD_CONFIG) public fileUploader: FileUploaderCustom,
        protected fb: FormBuilder,
    ) {
        super(fb);
        this.formFields = {
            controls: {
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
                        Validators.email,
                    ],
                ],
            },
            validationMessages: {
                email: {
                    required: errorFieldMessages.email.required,
                    email: errorFieldMessages.email.email,
                    invalidEmail: errorFieldMessages.email.email,
                    maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
                },
            },
        };
    }

    public allowedMineTypes = ['image/bmp', 'application/bmp', 'image/jpg', 'image/jpeg', 'application/pdf', 'image/png', 'application/png', 'image/tiff'];
    public maxFileSize = 5000000000;

    ngOnInit() {
        super.ngOnInit();
        this.fileUploader.onAfterAddingFile = (fileItem: FileItem) => {
            const type = fileItem.file.type;
            if (!inArray(type, this.allowedMineTypes)) {
                this.fileUploader.removeFromQueue(fileItem);
            }
            if (fileItem.file.size > this.maxFileSize) {
                this.fileUploader.removeFromQueue(fileItem);
            }
        };
    }

    public removeFile = (item) => this.fileUploader.removeFromQueue(item);

    public submitForm = (yy) => {
        console.log('__');
        console.log(this.form);
        if (this.fileUploader.queue.length > 0 && this.form.valid) {
            this.fileUploader.uploadAllFiles({
                email: this.form.getRawValue().email,
            });
            console.log('JSEM VALIDNI');
        } else {
            console.log('NEJSEM VALIDNI');
        }
    }
}
