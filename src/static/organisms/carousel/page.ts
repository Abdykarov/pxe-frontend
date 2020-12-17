import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class CarouselComponent {

    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Carousels',
                url: null,
            },
        ];
    }
}
