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
        this.metaService.addTags([
            {name: 'keywords', content: [
                    ...SEO.META_KEYWORDS.LANDING_AGE,
                    ...SEO.META_KEYWORDS.COOKIES_POLICY,
                ].toString(),
            },
            {name: 'description', content: SEO.META_DESCRIPTION},
        ]);

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
