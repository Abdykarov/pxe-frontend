import { Component } from '@angular/core';

import { getConfigStepper } from 'src/common/utils';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { offerConfig } from './config';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
    templateUrl: './page.html',
})
export class ContractSigningPageComponent {
    public offer: ISupplyPointOffer = offerConfig;
    public showOffer = false;
    public stepperProgressConfig = getConfigStepper(ProgressStatus.READY_FOR_SIGN);

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }
}
