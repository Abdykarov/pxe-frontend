import { Component } from '@angular/core';

import { stepperProgressConfig } from 'src/static/pages/import-approval/config';

@Component({
  templateUrl: './page.html',
})
export class ImportApprovalComponent {
    configStepper = stepperProgressConfig;
}
