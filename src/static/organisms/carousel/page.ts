import { Component } from '@angular/core';

import {
    carouselItems,
    interval,
} from 'src/static/organisms/carousel/config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})
export class CarouselPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public items = carouselItems;
    public interval = interval;

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Carousel',
                url: null,
            },
        ];
    }

    public clicked = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
