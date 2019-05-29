import { Component } from '@angular/core';

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
    public offer1 = offerConfig1;
    public offer2 = offerConfig2;
    public offer3 = offerConfig3;

    constructor(
        public progressbarConfig: SupplyPointsOfferPageConfig,
    ) {}

    public click = (data) => {
        console.log('clicked', data);
    }
}
