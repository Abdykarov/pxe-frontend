import { Component } from '@angular/core';

import { ContractSigningPageConfig } from './config';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { offerConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class ContractSigningPageComponent {
    public offer: IOffer = offerConfig;
    public showOffer = false;

    constructor(
        public config: ContractSigningPageConfig,
    ) {}

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }
}
