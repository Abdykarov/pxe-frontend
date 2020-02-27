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
    selector: 'pxe-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private titleService: Title,
        private metaService: Meta,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.COOKIES_POLICY);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.COOKIES_POLICY,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.COOKIES_POLICY,
            ].toString(),
        });

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
