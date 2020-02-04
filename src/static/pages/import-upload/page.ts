import { Component } from '@angular/core';

import { stepperProgressConfig } from 'src/static/pages/import-upload/config';

@Component({
    templateUrl: './page.html',
    styleUrls: ['./page.scss'],
})
export class ImportUploadComponent {
    configStepper = stepperProgressConfig;

    downloadExampleFile = (evt) => {
        evt.preventDefault();
        console.log('downloadExampleFile');
    }

    uploadFile = (evt) => {
        evt.preventDefault();
        console.log('upload');
    }

    backAction = (evt) => {
        evt.preventDefault();
        console.log('back');
    }
}
