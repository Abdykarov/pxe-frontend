import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { defaultBannerObj } from './config';

@Component({
  templateUrl: './page.html',
})

export class BannersPageComponent {
    public bannerObj = defaultBannerObj;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Banner',
                url: null,
            },
        ];
    }
}
