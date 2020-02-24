import { Component } from '@angular/core';
import { FileUploader } from 'src/common/utils/file-upload';

import {
    fileUploader,
    stepperProgressConfig,
} from 'src/static/pages/import-upload/config';

@Component({
    templateUrl: './page.html',
})
export class ImportUploadComponent {
    configStepper = stepperProgressConfig;
    uploader = fileUploader;

    downloadExampleFile = (evt) => {
        evt.preventDefault();
        console.log('downloadExampleFile');
    }

    uploadFile = (file: FileUploader) => {
        console.log('upload');
    }

    backAction = (evt) => {
        evt.preventDefault();
        console.log('back');
    }
}
