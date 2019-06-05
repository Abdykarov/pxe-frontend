import { Component } from '@angular/core';

import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import {
    offerConfig1,
    offerConfig2,
    offerConfig3,
    SupplyPointsOfferPageConfig,
} from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointsOfferPageComponent {
    public offer1: ISupplyPointOffer = offerConfig1;
    public offer2: ISupplyPointOffer = offerConfig2;
    public offer3: ISupplyPointOffer = offerConfig3;

    constructor(
        public progressbarConfig: SupplyPointsOfferPageConfig,
    ) {}

    public click = (data) => {
        console.log('clicked', data);
    }
}
