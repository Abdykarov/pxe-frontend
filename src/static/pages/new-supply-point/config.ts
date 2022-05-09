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

    public contractEndTypeOptions = [
        {
            key: 1,
            value: 1,
            label: 'Smlouva na dobu určitou',
        },
        {
            key: 2,
            value: 2,
            label: 'Smlouva na dobu určitou s automatickou prolongací',
        },
        {
            key: 3,
            value: 3,
            label: 'Smlouva na dobu neurčitou',
        },
    ];

    public circuitBreakerOptions = [
        {
            key: 1,
            value: 1,
            label: 'Bez ohledu na kapacitu',
        },
    ];

    public circuitBreakerPhaseOptions = [
        {
            key: 1,
            value: 1,
            label: '1-fázový',
        },
        {
            key: 2,
            value: 2,
            label: '3-fázový',
        },
    ];

    public circuitBreakerSizeOptions = [
        {
            key: 1,
            value: 1,
            label: '10A',
        },
        {
            key: 2,
            value: 2,
            label: '20A',
        },
        {
            key: 3,
            value: 3,
            label: '30A',
        },
    ];

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
