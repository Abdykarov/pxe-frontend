import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import { SEO } from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ISecuringYourData } from 'src/common/cms/models/securing-your-data';

@Component({
    selector: 'pxe-securing-your-data',
    templateUrl: './securing-your-data.component.html',
    styleUrls: ['./securing-your-data.component.scss'],
})
export class SecuringYourDataComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public securingYourData: ISecuringYourData = this.route.snapshot.data.securingYourData;

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle(this.securingYourData.seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: this.securingYourData.seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...this.securingYourData.seo.keywords,
            ].toString(),
        });

        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: this.securingYourData.breadcrumbTitle,
            },
        ];
    }
}
