import { Injectable } from '@angular/core';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Injectable({
    providedIn: 'root',
})
export class NewSupplyPointPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            active: true,
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            done: false,
            label: 'Výběr nabídky',
        },
        {
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];
}

