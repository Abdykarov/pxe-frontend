import {
    Component,
    OnInit,
} from '@angular/core';

import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { configStepper } from '../offer-selection/offer-selection.config';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.css'],
})
export class RecapitulationComponent implements OnInit {

    public stepperProgressConfig: IStepperProgressItem[] = configStepper;

    constructor() { }

    ngOnInit() {
    }

}
