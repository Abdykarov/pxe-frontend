import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    defaultFirstCard,
    defaultSecondCard,
    defaultListCard,
    defaultTileCard,
} from './config';

@Component({
    templateUrl: './page.html',
})

export class CardPageComponent {
    public firstCard = defaultFirstCard;
    public secondCard = defaultSecondCard;
    public listCard = defaultListCard;
    public tileCard = defaultTileCard;
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
