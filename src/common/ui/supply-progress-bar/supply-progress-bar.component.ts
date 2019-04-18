import {
    Component,
    Input,
} from '@angular/core';

import { SupplyProgressBarProgress } from './models/supply-progress-bar.type';

@Component({
    selector: 'pxe-supply-progress-bar',
    templateUrl: './supply-progress-bar.component.html',
    styleUrls: ['./supply-progress-bar.component.scss'],
})
export class SupplyProgressBarComponent {
    @Input()
    public progress: SupplyProgressBarProgress = SupplyProgressBarProgress.CHOOSE_OFFER;
}
