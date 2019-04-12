import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
              label: 'Landing page',
              url: null,
            },
        ];
    }
}
