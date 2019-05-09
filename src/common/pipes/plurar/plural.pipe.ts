import {
    I18nPluralPipe,
    NgLocalization,
} from '@angular/common';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
    name: 'plural',
})
export class PluralPipe implements PipeTransform {

    public itemPluralMapping = {
        'place': {
            '=1' : 'místo',
            '=2' : 'místa',
            '=3' : 'místa',
            '=4' : 'místa',
            'other' : 'míst',
        },
        'day': {
            '=1' : 'den v kuse',
            '=2' : 'dny v kuse',
            '=3' : 'dny v kuse',
            '=4' : 'dny v kuse',
            'other' : 'dní v kuse',
        },
        'stackCapacity': {
            '=1' : 'zásobník',
            '=2' : 'zásobníky',
            '=3' : 'zásobníky',
            '=4' : 'zásobníky',
            'other' : 'zásobníků',
        },
    };

    constructor(
        private localization: NgLocalization,
    ) {}

    transform(value: any, label: string): string {
        const i18nPipe: I18nPluralPipe = new I18nPluralPipe(this.localization);
        if (!this.itemPluralMapping[label]) {
            return label;
        }
        const amount = Math.abs(parseInt(value.toString(), 10));
        return i18nPipe.transform(amount, this.itemPluralMapping[label]);
    }
}
