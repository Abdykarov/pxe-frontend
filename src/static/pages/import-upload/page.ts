import { Component } from '@angular/core';

import { stepperProgressConfig } from 'src/static/pages/import-upload/config';

@Component({
  templateUrl: './page.html',
})
export class ImportUploadComponent {
    configStepper = stepperProgressConfig;
}
