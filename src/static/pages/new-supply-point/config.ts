import { Injectable } from '@angular/core';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Injectable({
    providedIn: 'root',
})
export class NewSupplyPointPageConfig {
    public commodityTypeOptions = [
        {
            key: 1,
            value: 'POWER',
            label: 'Elektřina',
        },
        {
            key: 2,
            value: 'GAS',
            label: 'Plyn',
        },
    ];

    public subscriberTypeOptions = [
        {
            key: 1,
            value: 'household',
            label: 'Domácnost',
        },
        {
            key: 2,
            value: 'firm',
            label: 'Firma',
        },
    ];

    public suppliersOptions = [
        {
            key: 1,
            value: 'supplier-1',
            label: 'ČEZ',
        },
        {
            key: 2,
            value: 'supplier-2',
            label: 'PRE',
        },
        {
            key: 3,
            value: 'supplier-3',
            label: 'Bohemia Energy',
        },
    ];

    public distributionRateOptions = [
        {
            key: 1,
            value: 'distribution-rate-1',
            label: 'Distribution rate 1',
        },
        {
            key: 2,
            value: 'distribution-rate-2',
            label: 'Distribution rate 2',
        },
        {
            key: 3,
            value: 'distribution-rate-3',
            label: 'Distribution rate 3',
        },
    ];

    public circuitBreakerOtions = [
        {
            key: 1,
            value: 'option-1',
            label: 'Breaker option 1',
        },
        {
            key: 2,
            value: 'option-2',
            label: 'Breaker option 2',
        },
        {
            key: 3,
            value: 'option-3',
            label: 'Breaker option 3',
        },
    ];

    public stepperProgressConfig: IStepperProgressItem[] = [
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
