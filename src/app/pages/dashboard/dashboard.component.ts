import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { ShowBannerComponent } from 'src/common/component/show-banner.component';

@Component({
    selector: 'pxe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends ShowBannerComponent {

    constructor(
        protected cd: ChangeDetectorRef,
        protected route: ActivatedRoute,
    ) {
        super(cd, route);
    }
}
