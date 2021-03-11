import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ITermsOfUSe } from 'src/common/cms/models/terms-of-use';
import { ISeo } from 'src/common/cms/models/seo';

@Component({
    selector: 'pxe-term-of-use',
    templateUrl: './terms-of-use.component.html',
    styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly termsOfUse: ITermsOfUSe = this.route.snapshot.data.termsOfUse;

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
        const seo: ISeo = R.head(this.termsOfUse.seo);

        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
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
