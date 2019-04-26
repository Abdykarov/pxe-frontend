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
            url: '/basic/progress',
            done: false,
            label: 'Step #1 progress',
        },
        {
            url: '/basic/colors',
            done: false,
            label: 'Step #2 colors',
        },
        {
            url: '/basic/alerts',
            done: false,
            label: 'Step #3 alerts',
        },
    ];

    public stepperProgressConfigSimple2: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #2 progress',
        },
        {
            url: '/basic/alerts',
            done: false,
            label: 'Step #3 alerts',
        },
    ];

    public stepperProgressConfigSimple3: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #3 progress',
        },
    ];

    public stepperProgressConfigSimple4: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
        },
        {
            url: '/basic/progress',
            done: true,
            label: 'Step #3 progress',
        },
    ];

    public stepperProgressConfigSubStep1: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #3 progress',
            shadowStep: true,
        },
        {
            url: '/basic/forms',
            done: false,
            label: 'Step #4 forms',
            shadowStep: true,
        },
        {
            url: '/basic/icons',
            done: false,
            label: 'Step #5 icons',
        },
    ];

    public stepperProgressConfigSubStep2: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
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
            url: '/basic/icons',
            done: false,
            label: 'Step #5 icons',
        },
    ];

    public stepperProgressConfigSubStep3: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
        },
        {
            url: '/basic/forms',
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            url: '/basic/icons',
            done: true,
            label: 'Step #4 icons',
            shadowStep: true,
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #5 progress',
        },
    ];

    public stepperProgressConfigSubStep4: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 alerts',
        },
        {
            url: '/basic/forms',
            done: true,
            label: 'Step #3 forms',
            shadowStep: true,
        },
        {
            url: '/basic/icons',
            done: true,
            label: 'Step #4 icons',
            shadowStep: true,
        },
        {
            url: '/basic/progress',
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
