import { Component } from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ROUTES } from 'src/app/app.constants';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent {
    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            url: ROUTES.ROUTER_SECURED_REQUEST_OFFER_SELECTION,
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: ROUTES.ROUTER_SECURED_REQUEST_SUPPLY_POINT,
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: ROUTES.ROUTER_SECURED_DASHBOARD,
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor() {
        super();
    }
}
