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
        'day': {
            '=1' : 'den',
            '=2' : 'dny',
            '=3' : 'dny',
            '=4' : 'dny',
            'other' : 'dní',
        },
        'hour': {
            '=1' : 'hodina',
            '=2' : 'hodiny',
            '=3' : 'hodiny',
            '=4' : 'hodiny',
            'other' : 'hodin',
        },
        'place': {
            '=1' : 'místo',
            '=2' : 'místa',
            '=3' : 'místa',
            '=4' : 'místa',
            'other' : 'míst',
        },
        'stackCapacity': {
            '=1' : 'zásobník',
            '=2' : 'zásobníky',
            '=3' : 'zásobníky',
            '=4' : 'zásobníky',
            'other' : 'zásobníků',
        },
        'year': {
            '=1' : 'rok',
            '=2' : 'roky',
            '=3' : 'roky',
            '=4' : 'roky',
            'other' : 'let',
        },
        'month': {
            '=1' : 'měsíc',
            '=2' : 'měsíce',
            '=3' : 'měsíce',
            '=4' : 'měsíce',
            'other' : 'měsíců',
        },
        'supplyPoint': {
            '=0' : 'žádné odběrné místo',
            '=1' : 'odběrné místo',
            '=2' : 'odběrná místa',
            '=3' : 'odběrná místa',
            '=4' : 'odběrná místa',
            'other' : 'odběrných míst',
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