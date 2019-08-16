import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-securing-your-data',
    templateUrl: './securing-your-data.component.html',
    styleUrls: ['./securing-your-data.component.scss'],
})
export class SecuringYourDataComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Ochrana osobních údajů',
            },
        ];
    }
}
