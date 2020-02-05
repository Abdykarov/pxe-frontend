import {
    Inject,
    Injectable,
} from '@angular/core';

import {
    FileUploader,
    FileUploaderOptions,
} from 'ng2-file-upload';

export const FILE_UPLOAD_CONFIG = 'file_upload_config';

@Injectable()
export class FileUploadService {
    public fileUploader: FileUploader;

    constructor(
        @Inject(FILE_UPLOAD_CONFIG) private fileUploaderOptions: FileUploaderOptions,
    ) {
        this.fileUploader = new FileUploader(fileUploaderOptions);
    }
}
