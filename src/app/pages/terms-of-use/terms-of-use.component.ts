import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import { getKeywordsAsArray } from 'src/common/cms/utils';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ITermsOfUSe } from 'src/common/cms/models/terms-of-use';
import { SEO } from 'src/app/app.constants';

@Component({
    selector: 'pxe-term-of-use',
    templateUrl: './terms-of-use.component.html',
    styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public termsOfUse: ITermsOfUSe = this.route.snapshot.data.termsOfUse;

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle(this.termsOfUse.seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: this.termsOfUse.seo.description,
        });
        console.log(this.termsOfUse.seo.keywords);
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...getKeywordsAsArray(this.termsOfUse.seo.keywords),
            ].toString(),
        });

        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: this.termsOfUse.breadcrumbTitle,
            },
        ];
    }
}
