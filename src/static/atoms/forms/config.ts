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

    public inlineRadiogroupOptions = [
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
    ];

    public selectOptions = [
        {
            key: 1,
            value: 'prasil',
            label: 'Prášil',
        },
        {
            key: 2,
            value: 'prochazka',
            label: 'Procházka',
        },
        {
            key: 3,
            value: 'prochazkova',
            label: 'Procházková',
        },
        {
            key: 4,
            value: 'podrazsky',
            label: 'Podrazský',
        },
        {
            key: 5,
            value: 'patera',
            label: 'Patera',
        },
        {
            key: 6,
            value: 'novak',
            label: 'Novák',
        },
        {
            key: 7,
            value: 'jonak',
            label: 'Jonák',
            disabled: true,
        },
    ];
}
