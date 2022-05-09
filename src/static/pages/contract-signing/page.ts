import { Component } from '@angular/core';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { getConfigStepper } from 'src/common/utils';
import { offerConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class ContractSigningPageComponent {
    public offer: IOffer = offerConfig;
    public showOffer = false;
    public stepperProgressConfig = getConfigStepper(
        ProgressStatus.READY_FOR_SIGN
    );
    public urlPdfInformation = '/assets/pdfs/static/information.pdf';
    public urlPdfContract = '/assets/pdfs/static/contract.pdf';

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    };
}
