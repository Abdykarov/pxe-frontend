import { Component } from '@angular/core';
import { IBreadcrumbItems } from '../../../common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
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
