import {
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'indicator',
})
export class IndicatorPipe implements PipeTransform {
    transform(annualConsumptionNT: number, lastAnnualConsumptionNT: number): number {
        return lastAnnualConsumptionNT / (annualConsumptionNT / 100) - 100;
    }
}


