import { Component } from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import {
    ROUTER_SECURED_DASHBOARD,
    ROUTER_SECURED_REQUEST_OFFER_SELECTION,
    ROUTER_SECURED_REQUEST_SUPPLY_POINT,
} from 'src/app/routes/routes';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent {
    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            url: ROUTER_SECURED_REQUEST_SUPPLY_POINT,
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: ROUTER_SECURED_REQUEST_OFFER_SELECTION,
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: ROUTER_SECURED_DASHBOARD,
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor() {
        super();
    }
}
