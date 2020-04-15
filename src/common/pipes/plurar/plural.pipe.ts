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
        'minute': {
            '=1' : 'minutu',
            '=2' : 'minuty',
            '=3' : 'minuty',
            '=4' : 'minuty',
            'other' : 'minut',
        },
        'sec': {
            '=1' : 'sekundu',
            '=2' : 'sekundy',
            '=3' : 'sekundy',
            '=4' : 'sekundy',
            'other' : 'sekund',
        },
        'place': {
            '=1' : 'místo',
            '=2' : 'místa',
            '=3' : 'místa',
            '=4' : 'místa',
            'other' : 'míst',
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
        'willNotImported': {
            '=1' : ', která nebude naimportována',
            '=2' : ', které nebudou naimportovány',
            '=3' : ', které nebudou naimportovány',
            '=4' : ', které nebudou naimportovány',
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
