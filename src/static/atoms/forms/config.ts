import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormsPageConfig {

    public options = [
        {
            key: 1,
            value: 'value-one',
            label: 'Radio button one',
        },
        {
            key: 2,
            value: 'value-two',
            label: 'Radio button two',
        },
        {
            key: 3,
            value: 'value-three',
            label: 'Disabled radio button',
            disabled: true,
        },
    ];

    constructor() {}
}
