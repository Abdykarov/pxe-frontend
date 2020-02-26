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
        'offer_delete': {
            '=1' : 'nabídku',
            '=2' : 'nabídky',
            '=3' : 'nabídky',
            '=4' : 'nabídky',
            'other' : 'nabídek',
        },
        'offer': {
            '=1' : 'nabídka',
            '=2' : 'nabídky',
            '=3' : 'nabídky',
            '=4' : 'nabídky',
            'other' : 'nabídek',
        },
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
        'error'  : {
            '=1' : 'chybu',
            '=2' : 'chyby',
            '=3' : 'chyby',
            '=4' : 'chyby',
            'other' : 'chyb',
        },
        'new_offer' : {
            '=1' : 'novou nabídku',
            '=2' : 'nové nabídky',
            '=3' : 'nové nabídky',
            '=4' : 'nové nabídky',
            'other' : 'nových nabídek',
        },
        'duplicity' : {
            '=1' : 'duplicitu',
            '=2' : 'duplicity',
            '=3' : 'duplicity',
            '=4' : 'duplicity',
            'other' : 'duplicit',
        },
        'was'  : {
            '=1' : 'byla',
            '=2' : 'byly',
            '=3' : 'byly',
            '=4' : 'byly',
            'other' : 'bylo',
        },
        'omitted': {
            '=1' : 'vynechána',
            '=2' : 'vynechány',
            '=3' : 'vynechány',
            '=4' : 'vynechány',
            'other' : 'vynecháno',
        },
        'willNotImported': {
            '=1' : ', která nebude naimportována',
            '=2' : ', které nebude naimportovány',
            '=3' : ', které nebude naimportovány',
            '=4' : ', které nebude naimportovány',
            'other' : ', které nebudou naimportovány',
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
