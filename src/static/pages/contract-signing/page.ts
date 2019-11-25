import { Component } from '@angular/core';

import { getConfigStepper } from 'src/common/utils';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { offerConfig } from './config';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
    templateUrl: './page.html',
    styleUrls: ['./page.scss'],
})
export class ContractSigningPageComponent {
    public offer: IOffer = offerConfig;
    public showOffer = false;
    public stepperProgressConfig = getConfigStepper(ProgressStatus.READY_FOR_SIGN);
    public urlPdfInformation = '/assets/pdfs/static/information.pdf';
    public urlPdfContract = '/assets/pdfs/static/contract.pdf';

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }
}
