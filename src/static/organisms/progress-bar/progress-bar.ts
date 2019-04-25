import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './progress-bar.html',
})
export class ProgressBarComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public stepperProgressConfig = [
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
