import { Component } from '@angular/core';

import { bannerObj } from 'src/static/atoms/banners/config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})
export class BannersPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public bannerObj = bannerObj;


    public clicked = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Banner',
                url: null,
            },
        ];
    }
}
