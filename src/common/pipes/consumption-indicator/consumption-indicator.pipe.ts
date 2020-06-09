import { DecimalPipe } from '@angular/common';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { countIndicator } from 'src/common/utils';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'consumptionIndicator',
})
export class ConsumptionIndicatorPipe implements PipeTransform {
    private allIsFilled = R.all(R_.isTruthy);

    constructor(
       private decimalPipe: DecimalPipe,
    ) {}

    transform(data: ISupplyPoint, unit: string): number | string {
        const {
            annualConsumptionVT = null,
            annualConsumptionNT = null,
            lastAnnualConsumptionVT = null,
            lastAnnualConsumptionNT = null,
        } = data;

        if (this.allIsFilled([
            annualConsumptionVT,
            annualConsumptionNT,
            lastAnnualConsumptionVT,
            lastAnnualConsumptionNT,
        ])) {
            const annualConsumption = annualConsumptionVT + annualConsumptionNT;
            const lastAnnualConsumption = lastAnnualConsumptionVT + lastAnnualConsumptionNT;
            if (lastAnnualConsumption !== annualConsumption) {
                return countIndicator(annualConsumption, lastAnnualConsumption);
            } else {
                return `${this.decimalPipe.transform(annualConsumption, '1.0-3')} ${unit}`;
            }
        }

        if (annualConsumptionVT && lastAnnualConsumptionVT && annualConsumptionVT !== lastAnnualConsumptionVT) {
            return countIndicator(annualConsumptionVT, lastAnnualConsumptionVT);
        }

        if (annualConsumptionNT && lastAnnualConsumptionNT && annualConsumptionNT !== lastAnnualConsumptionNT) {
            return countIndicator(annualConsumptionNT, lastAnnualConsumptionNT);
        }

        return `${this.decimalPipe.transform(R.sum([annualConsumptionNT, annualConsumptionVT]), '1.0-3')} ${unit}`;
    }
}
