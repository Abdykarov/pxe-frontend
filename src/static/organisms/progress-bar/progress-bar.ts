import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { SupplyPointState } from 'src/common/graphql/models/supply.model';

@Component({
  templateUrl: './progress-bar.html',
})
export class ProgressBarComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            active: true,
            done: false,
            label: 'Step #1 progress',
        },
        {
            done: false,
            label: 'Step #2 colors',
        },
        {
            done: false,
            label: 'Step #3 alerts',
        },
    ];

    public stepperProgressConfigSimple2: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            active: true,
            done: false,
            label: 'Step #2 progress',
        },
        {
            done: false,
            label: 'Step #3 alerts',
        },
    ];

    public stepperProgressConfigSimple3: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            done: true,
            label: 'Step #2 alerts',
        },
        {
            active: true,
            done: false,
            label: 'Step #3 progress',
        },
    ];

    public stepperProgressConfigSimple4: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            done: true,
            label: 'Step #2 alerts',
        },
        {
            active: true,
            done: true,
            label: 'Step #3 progress',
        },
    ];

    public stepperProgressConfigSubStep1: IStepperProgressItem[] = [
        {
            step: SupplyPointState.CREATE,
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CHOOSE_OFFER,
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: SupplyPointState.PERSONAL_INFO,
            label: 'Rekapitulace',
            shadowStep: true,
            active: true,
        },
        {
            step: SupplyPointState.CONTRACT,
            label: 'Smlouva',
            shadowStep: true,
        },
        {
            step: SupplyPointState.COMPLETED,
            label: 'Step #3 alert',
        },
    ];

    public stepperProgressConfigSubStep2: IStepperProgressItem[] = [
        {
            step: SupplyPointState.CREATE,
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CHOOSE_OFFER,
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: SupplyPointState.PERSONAL_INFO,
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CONTRACT,
            label: 'Smlouva',
            shadowStep: true,
            active: true,

        },
        {
            step: SupplyPointState.COMPLETED,
            label: 'Step #3 alert',
        },
    ];

    public stepperProgressConfigSubStep3: IStepperProgressItem[] = [
        {
            step: SupplyPointState.CREATE,
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CHOOSE_OFFER,
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: SupplyPointState.PERSONAL_INFO,
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CONTRACT,
            label: 'Smlouva',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.COMPLETED,
            label: 'Step #3 alert',
            active: true,
        },
    ];

    public stepperProgressConfigSubStep4: IStepperProgressItem[] = [
        {
            step: SupplyPointState.CREATE,
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CHOOSE_OFFER,
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: SupplyPointState.PERSONAL_INFO,
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.CONTRACT,
            label: 'Smlouva',
            shadowStep: true,
            done: true,
        },
        {
            step: SupplyPointState.COMPLETED,
            label: 'Step #3 alert',
            done: true,
        },
    ];

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Progress bar',
                url: null,
            },
        ];
    }
}
