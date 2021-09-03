import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

import {
    config,
    config2,
    config3,
} from 'src/static/organisms/graphs/config';

@Component({
    templateUrl: './page.html',
})
export class GraphsPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public barData = config;
    public barData2 = config2;

    public gaussianDistribution = config3;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Graphs',
                url: null,
            },
        ];
    }

    public mouseMove = (evt) => {
        console.log('MOUSE MOVE');
        console.log(evt);
    }
}
