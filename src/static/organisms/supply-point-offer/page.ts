import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IOffer } from 'src/common/graphql/models/offer.model';
import {
    offerConfig,
    question,
} from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointOfferComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public question = question;
    public supplyPointOffer: IOffer = offerConfig;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply point offer',
                url: null,
            },
        ];
    }

    public click = (data) => {
        console.log('clicked', data);
    }
}
