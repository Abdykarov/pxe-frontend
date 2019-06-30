import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

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
            shadowStep: true,
        },
        {
            done: false,
            label: 'Step #4 forms',
            shadowStep: true,
        },
        {
            done: false,
            label: 'Step #5 icons',
        },
    ];

    public stepperProgressConfigSubStep2: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            done: true,
            label: 'Step #2 alerts',
        },
        {
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            active: true,
            done: false,
            label: 'Step #4 progress',
            shadowStep: true,
        },
        {
            done: false,
            label: 'Step #5 icons',
        },
    ];

    public stepperProgressConfigSubStep3: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            done: true,
            label: 'Step #2 alerts',
        },
        {
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            done: true,
            label: 'Step #4 icons',
            shadowStep: true,
        },
        {
            active: true,
            done: false,
            label: 'Step #5 progress',
        },
    ];

    public stepperProgressConfigSubStep4: IStepperProgressItem[] = [
        {
            done: true,
            label: 'Step #1 colors',
        },
        {
            done: true,
            label: 'Step #2 alerts',
        },
        {
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            done: true,
            label: 'Step #4 icons',
            shadowStep: true,
        },
        {
            active: true,
            done: true,
            label: 'Step #5 progress',
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
