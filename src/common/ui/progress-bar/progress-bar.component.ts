import {
    Component,
    Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { IStepperProgressItem } from './models/progress.model';

@Component({
    selector: 'pxe-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent extends AbstractComponent {
    @Input()
    public config: IStepperProgressItem[] = [];

    @Input()
    public notLight = false;

    @Input()
    public withoutText = false;

    constructor(
        private router: Router,
    ) {
        super();
    }
}
