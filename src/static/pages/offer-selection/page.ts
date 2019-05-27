import { Component } from '@angular/core';

import { config } from './config';
import { configStepper } from 'src/app/pages/request/offer-selection/offer-selection.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IOffer } from 'src/common/graphql/models/offer.model';

@Component({
    templateUrl: './page.html',
})
export class OfferSelectionPageComponent {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public offers: IOffer[] = config;

    public action = (evt) => {
        console.log('clicked');
    }
}
