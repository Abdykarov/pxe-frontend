import { Component } from '@angular/core';

import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    templateUrl: './page.html',
})

export class NewSupplyPointPageComponent {
    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            url: '/basic/new-supply-point',
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/basic/menu-selection',
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: '/basic/contract-signing',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];
}
