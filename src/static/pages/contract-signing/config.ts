import { Injectable } from '@angular/core';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Injectable({
    providedIn: 'root',
})
export class ContractSigningPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/basic/new-supply-point',
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/basic/menu-selection',
            done: true,
            label: 'Výběr nabídky',
        },
        {
            url: '/basic/forms',
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #4 progress',
            shadowStep: true,
        },
        {
            url: '/basic/contract-signing',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];
}
