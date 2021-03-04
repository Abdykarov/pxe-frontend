import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import {
    CONSTS,
    SEO,
} from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-securing-your-data',
    templateUrl: './securing-your-data.component.html',
    styleUrls: ['./securing-your-data.component.scss'],
})
export class SecuringYourDataComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private metaService: Meta,
        private titleService: Title,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.SECURING_YOUR_DATA);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.SECURING_YOUR_DATA,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.SECURING_YOUR_DATA,
            ].toString(),
        });

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
