import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class BannersPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public bannerText = 'Banner longer descritpion';

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
