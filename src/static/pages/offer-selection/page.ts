import { Component } from '@angular/core';

import { config } from './config';
import { configStepper } from 'src/app/pages/request/offer-selection/offer-selection.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Component({
    templateUrl: './page.html',
})
export class OfferSelectionPageComponent {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public supplyPointOffers: ISupplyPointOffer[] = config;

    public action = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
