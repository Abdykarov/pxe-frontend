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
    selector: 'pxe-term-of-use',
    templateUrl: './terms-of-use.component.html',
    styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private metaService: Meta,
        private titleService: Title,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.TERMS_OF_USE);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.TERMS_OF_USE,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.TERMS_OF_USE,
            ].toString(),
        });

        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Podmínky užívání',
            },
        ];
    }
}
