import {
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'consumptionIndicator',
})
export class ConsumptionIndicatorPipe implements PipeTransform {
    transform(annualConsumptionNT: number, lastAnnualConsumptionNT: number): number {
        return lastAnnualConsumptionNT / (annualConsumptionNT / 100) - 100;
    }
}


