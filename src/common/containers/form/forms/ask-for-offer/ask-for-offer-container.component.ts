import {
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FILE_UPLOAD_CONFIG_PROVIDER } from 'src/app/app.constants';
import { fileUploaderFactory } from 'src/app/pages/suppliers/import/upload/upload.config';
import {
    askForOfferCodes,
    defaultErrorMessage,
} from 'src/common/constants/errors.constant';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { AuthService } from 'src/common/services/auth.service';
import { inArray } from 'src/common/utils';
import { FileItem } from 'src/third-sides/file-upload';
import { FileUploaderCustom } from 'src/third-sides/file-upload/file-uploader-custom';
import { formFields } from './ask-for-offer-container.config';

@Component({
    selector: 'pxe-ask-for-offer-container',
    templateUrl: './ask-for-offer-container.component.html',
    styleUrls: ['./ask-for-offer-container.component.scss'],
    providers: [
        {
            provide: FILE_UPLOAD_CONFIG_PROVIDER,
            useFactory: fileUploaderFactory(
                'ask-for-offer/send',
                'files',
                true
            ),
            deps: [AuthService],
        },
    ],
})
export class AskForOfferContainerComponent
    extends AbstractFormComponent
    implements OnInit
{
    public readonly allowedMineTypes =
        this.CONSTS.ASK_FOR_OFFER.ALLOWED_MINE_TYPE;
    public readonly maxFileCount = this.CONSTS.ASK_FOR_OFFER.MAX_FILE_COUNT;
    public readonly maxFileSize = this.CONSTS.ASK_FOR_OFFER.MAX_FILE_SIZE;

    public success = false;
    public errors: string[] = [];

    @Input()
    public id = 'ask-for-offer-container';

    @Input()
    public idFileUploader = 'file-upload';

    @Input()
    public email: string = null;

    @Input()
    public isPublic = true;

    @Input()
    public fileUploaderTemplate?: TemplateRef<any>;

    @Input()
    public fileUploaderWrapperCustomClass = 'drop-zone--zindex text-white';

    constructor(
        private cd: ChangeDetectorRef,
        @Inject(FILE_UPLOAD_CONFIG_PROVIDER)
        public fileUploader: FileUploaderCustom,
        protected fb: FormBuilder
    ) {
        super(fb);
        this.formFields = formFields;
    }

    ngOnInit() {
        super.ngOnInit();
        this.fileUploader.onBeforeAddingFiles = (files: File[]) => {
            this.errors = [];
            this.success = false;
        };

        this.fileUploader.onSuccessItem = (_, __, status) => {
            if (status === 200) {
                this.fileUploader.queue = [];
                this.success = true;
                this.cd.markForCheck();
            }
        };

        this.fileUploader.onErrorItem = (_, __, status) => {
            this.errors.push(defaultErrorMessage);
            this.cd.markForCheck();
        };

        this.fileUploader.onAfterAddingFile = (fileItem: FileItem) => {
            const type = fileItem.file.type;
            if (fileItem.file.size > this.maxFileSize) {
                this.errors.push(
                    askForOfferCodes[
                        this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_SIZE
                    ]
                );
                this.fileUploader.removeFromQueue(fileItem);
                return;
            }
            if (!inArray(type, this.allowedMineTypes)) {
                this.fileUploader.removeFromQueue(fileItem);
                this.errors.push(
                    askForOfferCodes[
                        this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_TYPE
                    ]
                );
                return;
            }
            if (
                this.fileUploader.queue.length >
                this.CONSTS.ASK_FOR_OFFER.MAX_FILE_COUNT
            ) {
                this.fileUploader.removeFromQueue(fileItem);
                this.errors.push(
                    askForOfferCodes[
                        this.CONSTS.ASK_FOR_OFFER.ERROR_CODES.FILE_COUNT
                    ]
                );
                return;
            }
        };

        if (this.email) {
            this.form.controls['email'].setValue(this.email);
            this.form.controls['consent'].setValue(true);
        }
    }

    public removeFile = (item) => {
        this.fileUploader.removeFromQueue(item);
        this.cd.markForCheck();
    };

    public submitForm = (data) => {
        if (this.fileUploader.queue.length > 0 && this.form.valid) {
            this.fileUploader.uploadAllFiles({
                email: this.email || this.form.getRawValue().email,
            });
        }
        this.form.markAllAsTouched();
    };
}
