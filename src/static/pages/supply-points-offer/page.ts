import { Component } from '@angular/core';

import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import {
    offerConfig1,
    offerConfig2,
    offerConfig3,
} from './config';
import { getConfigStepperByState } from 'src/common/utils/get-progress-stepper-config.fnc';
import { SupplyPointState } from 'src/common/graphql/models/supply.model';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointsOfferPageComponent {
    public offer1: ISupplyPointOffer = offerConfig1;
    public offer2: ISupplyPointOffer = offerConfig2;
    public offer3: ISupplyPointOffer = offerConfig3;

    public progressbarConfig = getConfigStepperByState(SupplyPointState.CHOOSE_OFFER);

    public click = (data) => {
        console.log('clicked', data);
    }
}
