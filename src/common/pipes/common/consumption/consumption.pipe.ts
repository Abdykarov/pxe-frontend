import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {
    IConsumption,
    RESULT_TYPE_CONSUMPTION,
} from './model/consumption-model';

const defaultDigitsInfo = '1.0-1';

@Pipe({
    name: 'consumption',
})
export class ConsumptionPipe implements PipeTransform {
    constructor(private decimalPipe: DecimalPipe) {}

    transform(
        value: number,
        resultType: RESULT_TYPE_CONSUMPTION
    ): IConsumption | string {
        const units = ['Wh', 'KWh', 'MWh', 'GWh', 'TWh', 'PWh'];
        const number = Math.floor(Math.log(value) / Math.log(1000));
        switch (resultType) {
            case RESULT_TYPE_CONSUMPTION.UNIT:
                return units[number];
            case RESULT_TYPE_CONSUMPTION.VALUE:
                return this.formatValue(
                    value / Math.pow(1000, Math.floor(number))
                );
            case RESULT_TYPE_CONSUMPTION.BOTH:
                return {
                    value: this.formatValue(
                        value / Math.pow(1000, Math.floor(number))
                    ),
                    unit: units[number],
                };
        }
    }

    formatValue(input: number): string {
        return this.decimalPipe.transform(input, defaultDigitsInfo);
    }
}
