import { Component, Input } from '@angular/core';
import { IStepperProgressItem } from './models/progress.model';

@Component({
    selector: 'pxe-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
    @Input()
    public config: IStepperProgressItem[] = [];

    @Input()
    public isMinor = false;
}
