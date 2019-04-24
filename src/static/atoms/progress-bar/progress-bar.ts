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
        // {
        //     url: '/basic/colors',
        //     done: true,
        //     subStep: true,
        //     label: 'Step #2 colors',
        // },
        {
            url: '/basic/icons',
            done: true,
            label: 'Step #3 icons',
        },
        // {
        //     url: '/basic/icons',
        //     done: true,
        //     subStep: true,
        //     label: 'Step #4 icons',
        // },
        {
            url: '/basic/progress',
            done: false,
            label: 'Step #5 typography',
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
