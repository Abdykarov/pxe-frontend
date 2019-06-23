import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';

@Component({
    selector: 'pxe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AbstractComponent {

    constructor(
        private cd: ChangeDetectorRef,
    ) {
        super();
    }
}
