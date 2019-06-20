import { Component } from '@angular/core';

import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    selector: 'pxe-request-card',
    templateUrl: './request-card.component.html',
    styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent {
    public stepperProgressConfigSimple2: IStepperProgressItem[] = [
        {
            url: '/basic/new-supply-point',
            done: true,
            label: '',
        },
        {
            url: '/basic/request-card',
            done: false,
            label: '',
        },
        {
            url: '/basic/contract-signing',
            done: false,
            label: '',
        },
    ];
}

