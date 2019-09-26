import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Cookies policy',
            },
        ];
    }
}
