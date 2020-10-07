import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import { AbstractComponent } from 'src/common/abstract.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ICookiePolicy } from 'src/common/cms/models/cookie.policy';
import { SEO } from 'src/app/app.constants';

@Component({
    selector: 'pxe-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent extends AbstractComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public cookiePolicy: ICookiePolicy = this.route.snapshot.data.cookiePolicy;

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(this.cookiePolicy.seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: this.cookiePolicy.seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...this.cookiePolicy.seo.keywords,
            ].toString(),
        });

        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: this.cookiePolicy.breadcrumbTitle,
            },
        ];
    }
}
