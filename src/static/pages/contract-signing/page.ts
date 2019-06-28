import { Component } from '@angular/core';

import { getConfigStepperByState } from 'src/common/utils/get-progress-stepper-config.fnc';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { offerConfig } from './config';
import { SupplyPointState } from 'src/common/graphql/models/supply.model';

@Component({
    templateUrl: './page.html',
})
export class ContractSigningPageComponent {
    public offer: ISupplyPointOffer = offerConfig;
    public showOffer = false;
    public stepperProgressConfig = getConfigStepperByState(SupplyPointState.CHOOSE_OFFER);

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }
}
