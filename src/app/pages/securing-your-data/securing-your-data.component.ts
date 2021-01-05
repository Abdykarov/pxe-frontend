import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ISecuringYourData } from 'src/common/cms/models/securing-your-data';
import { ISeo } from 'src/common/cms/models/seo';

@Component({
    selector: 'pxe-securing-your-data',
    templateUrl: './securing-your-data.component.html',
    styleUrls: ['./securing-your-data.component.scss'],
})
export class SecuringYourDataComponent {
    public readonly securingYourData: ISecuringYourData = this.route.snapshot.data.securingYourData;
    public readonly breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: this.securingYourData.breadcrumbTitle,
        },
    ];

    constructor(
        private metaService: Meta,
        private route: ActivatedRoute,
        private titleService: Title,
    ) {
        const seo: ISeo = R.head(this.securingYourData.seo);
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
