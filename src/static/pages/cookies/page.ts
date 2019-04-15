import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})

export class CookiesPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Cookies policy',
                url: null,
            },
        ];
    }
}
