import { Injectable } from '@angular/core';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Injectable({
    providedIn: 'root',
})
export class NewSupplyPointPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/basic/list-supply-points',
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

