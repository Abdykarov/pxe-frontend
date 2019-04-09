import { DecimalPipe } from '@angular/common';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

const defaultDigitsInfo = '1.0-1';

@Pipe({
        name: 'consumption',
})
export class ConsumptionPipe implements PipeTransform {

    constructor(
        private decimalPipe: DecimalPipe,
    ) {}

    transform(value: number): string {
        const units = ['Wh', 'KWh', 'MWh', 'GWh', 'TWh', 'PWh'],
            number = Math.floor(Math.log(value) / Math.log(1000));
        return  `${this.formatValue(value / Math.pow(1000, Math.floor(number)))} ${units[number]}`;
    }

    formatValue(input: number): string {
        return this.decimalPipe.transform(input, defaultDigitsInfo);
    }
}
