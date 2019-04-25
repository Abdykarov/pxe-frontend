import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
  templateUrl: './progress-bar.html',
})
export class ProgressBarComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/basic/colors',
            done: true,
            label: 'Step #1 colors',
        },
        {
            url: '/basic/alerts',
            done: true,
            label: 'Step #2 progress',
        },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #3 icons',
            shadowStep: true,
        },
        {
            url: '/basic/forms',
            done: false,
            label: 'Step #3 icons',
            shadowStep: true,
        },
        {
            url: '/basic/icons',
            done: false,
            label: 'Step #3 icons',
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
