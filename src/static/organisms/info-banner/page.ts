import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class InfoBannerPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Info banner',
                url: null,
            },
        ];
    }

    public trigger = () => alert('Help icon works!');
}
