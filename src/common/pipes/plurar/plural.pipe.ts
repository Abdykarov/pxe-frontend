import {
    I18nPluralPipe,
    NgLocalization,
} from '@angular/common';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R_ from 'ramda-extension';

@Pipe({
    name: 'plural',
})
export class PluralPipe implements PipeTransform {

    public itemPluralMapping = {
        'place': {
            '=1' : 'Místo',
            '=2' : 'Místa',
            '=3' : 'Místa',
            '=4' : 'Města',
            'other' : 'Měsíců',
        },
        'day': {
            '=1' : 'Den',
            '=2' : 'Dny',
            '=3' : 'Dny',
            '=4' : 'Dny',
            'other' : 'Dní',
        },
    };

    constructor(
        private localization: NgLocalization,
    ) {}

    transform(value: string, label: string): string {
        const i18nPipe: I18nPluralPipe = new I18nPluralPipe(this.localization);
        const amount = Math.abs(parseInt(value, 10));
        if (!this.itemPluralMapping[label] || !R_.isNumeric(amount)) {
            return label;
        }
        return i18nPipe.transform(amount, this.itemPluralMapping[label]);
    }
}
