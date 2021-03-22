import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    defaultTileCard,
    defaultBlogCard,
} from './config';

@Component({
    templateUrl: './page.html',
})

export class CardPageComponent {
    public tileCard = defaultTileCard;
    public blogCard = defaultBlogCard;
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public goSomewhere() {
        alert('SOMEWHERE');
    }
    public tileAction() {
        alert('TILEACTION');
    }

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Cards',
                url: null,
            },
        ];
    }
}
