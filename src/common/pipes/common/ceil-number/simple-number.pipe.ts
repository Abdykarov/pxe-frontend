import { DecimalPipe } from '@angular/common';
import {
    Inject,
    LOCALE_ID,
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
    name: 'ceil',
})
export class CeilPipe implements PipeTransform {
    constructor(
        private decimalPipe: DecimalPipe,
        @Inject(LOCALE_ID) private locale: string,
    ) {}

    transform(number: number, decimals = 2, digitsInfo: string = '1.0-2', locale: string = this.locale): string {
        const decimalsBase = Math.pow(10, decimals);
        const result = Math.ceil(number * decimalsBase) / decimalsBase;
        const formattedNumber = this.decimalPipe.transform(result, digitsInfo, locale);
        return formattedNumber;
    }
}
