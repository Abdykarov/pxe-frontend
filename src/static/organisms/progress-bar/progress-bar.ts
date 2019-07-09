import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

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
            step: 'CREATE',
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'CHOOSE_OFFER',
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: 'PERSONAL_INFO',
            label: 'Rekapitulace',
            shadowStep: true,
            active: true,
        },
        {
            step: 'CONTRACT',
            label: 'Smlouva',
            shadowStep: true,
        },
        {
            step: 'WAINTING_FOR_PAYMENT',
            label: 'Step #3 alert',
        },
    ];

    public stepperProgressConfigSubStep2: IStepperProgressItem[] = [
        {
            step: 'SUPPLY_POINT',
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: ProgressStatus.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: ProgressStatus.NONE,
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'OFFER_STEP',
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: 'PERSONAL_DATA',
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: 'READY_FOR_SIGN',
            label: 'Smlouva',
            shadowStep: true,
            active: true,

        },
        {
            step: 'WAITING_FOR_PAYMENT',
            label: 'Step #3 alert',
        },
    ];

    public stepperProgressConfigSubStep3: IStepperProgressItem[] = [
        {
            step: 'SUPPLY_POINT',
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'OFFER_STEP',
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: 'PERSONAL_DATA',
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: 'READY_FOR_SIGN',
            label: 'Smlouva',
            shadowStep: true,
            done: true,
        },
        {
            step: 'WAITING_FOR_PAYMENT',
            label: 'Step #3 alert',
            active: true,
        },
    ];

    public stepperProgressConfigSubStep4: IStepperProgressItem[] = [
        {
            step: 'SUPPLY_POINT',
            label: 'Step #1 colors',
            done: true,

        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'NONE',
            label: '',
            shadowStep: true,
            done: true,
        },
        {
            step: 'OFFER_STEP',
            label: 'Step #2 colors',
            done: true,
        },
        {
            step: 'PERSONAL_DATA',
            label: 'Rekapitulace',
            shadowStep: true,
            done: true,
        },
        {
            step: 'READY_FOR_SIGN',
            label: 'Smlouva',
            shadowStep: true,
            done: true,
        },
        {
            step: 'WAITING_FOR_PAYMENT',
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
