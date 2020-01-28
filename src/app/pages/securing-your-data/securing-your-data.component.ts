import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CONSTS } from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-securing-your-data',
    templateUrl: './securing-your-data.component.html',
    styleUrls: ['./securing-your-data.component.scss'],
})
export class SecuringYourDataComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.SECURING_YOUR_DATA);
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
