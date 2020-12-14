import {
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
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
            useFactory: fileUploaderFactory('ask-for-offer/send', 'files', false),
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

    constructor(
        @Inject(FILE_UPLOAD_CONFIG) public fileUploader: FileUploaderCustom,
        protected fb: FormBuilder,
    ) {
        super(fb);
        this.formFields = formFields;
    }

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
