import { Component } from '@angular/core';

import {
    fileUploader,
    stepperProgressConfig,
} from 'src/static/pages/import-upload/config';
import { FileUploader } from 'src/third-sides/file-upload';

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
