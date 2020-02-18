import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import {
    Inject,
    Injectable,
} from '@angular/core';

import {
    FileUploader,
    FileUploaderOptions,
} from 'ng2-file-upload';

import { environment } from 'src/environments/environment';

export const FILE_UPLOAD_CONFIG = 'file_upload_config';

@Injectable()
export class FileUploadService {
    public fileUploader: FileUploader;

    constructor(
        private authService: AuthService,
        @Inject(FILE_UPLOAD_CONFIG) private fileUploaderOptions: FileUploaderOptions,
    ) {
        this.fileUploader = new FileUploader(fileUploaderOptions);
        this.fileUploader.options.headers = [
            {
                name: 'Authorization',
                value: 'Bearer ' + this.authService.getToken(),
            },
            {
                name: 'X-API-Key',
                value: `${environment.x_api_key}`,
            },
            {
                name: 'content-type',
                value: CONSTS.IMPORT_OFFERS_TYPE,
            },
        ];
     }
}
