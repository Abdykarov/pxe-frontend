import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';
import { AbstractComponent } from 'src/common/abstract.component';
import { ICookiePolicy } from 'src/common/cms/models/cookie.policy';
import { ISeo } from 'src/common/cms/models/seo';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent extends AbstractComponent {
    public readonly cookiePolicy: ICookiePolicy =
        this.route.snapshot.data.cookiePolicy;
    public readonly breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: this.cookiePolicy.breadcrumbTitle,
        },
    ];

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        super();
        const seo: ISeo = R.head(this.cookiePolicy.seo);
        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });
    }
}
