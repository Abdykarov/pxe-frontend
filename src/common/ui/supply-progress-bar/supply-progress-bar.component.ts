import {
    Component,
    Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from '../../abstract.component';
import { IStepperProgressItem } from './stepper-progress.model.ts/supply-progress-bar.type';

@Component({
    selector: 'pxe-supply-progress-bar',
    templateUrl: './supply-progress-bar.component.html',
    styleUrls: ['./supply-progress-bar.component.scss'],
})
export class SupplyProgressBarComponent extends AbstractComponent {
    @Input()
    public config: IStepperProgressItem[] = [];

    constructor(
        private router: Router,
    ) {
        super();
    }

    public isRouteIsActive = (routePath: string): boolean => this.router.url === routePath;
}
