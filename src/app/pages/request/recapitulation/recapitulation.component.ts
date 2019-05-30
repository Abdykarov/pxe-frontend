import { Component } from '@angular/core';

import { configStepper } from 'src/app/pages/request/recapitulation/recapitulation.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
}
