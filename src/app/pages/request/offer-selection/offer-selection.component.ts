import { Component } from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent {

    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            url: '/secured/request/supply-point',
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/secured/request/offer-selection',
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: '/secured/dashboard',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor() {
        super();
    }
}
