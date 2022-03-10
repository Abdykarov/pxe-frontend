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
    public configStepper = stepperProgressConfig;
    public uploader = fileUploader;

    public downloadExampleFile = (evt) => {
        evt.preventDefault();
        console.log('downloadExampleFile');
    };

    public uploadFile = (file: FileUploader) => {
        console.log('upload');
    };

    public backAction = (evt) => {
        evt.preventDefault();
        console.log('back');
    };
}
