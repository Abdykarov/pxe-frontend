import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'consumptionIndicator',
})
export class ConsumptionIndicatorPipe implements PipeTransform {
    private allIsTruthy = (values) => R.all(R_.isTruthy)(values);

    private count = (last: number, avg: number) => {
        return last / (avg / 100) - 100;
    }

    transform(data: ISupplyPoint, unit: string): number | string {
        const {
            annualConsumptionVT = null,
            annualConsumptionNT = null,
            lastAnnualConsumptionVT = null,
            lastAnnualConsumptionNT = null,
        } = data;

        if (this.allIsTruthy([
            annualConsumptionVT,
            annualConsumptionNT,
            lastAnnualConsumptionVT,
            lastAnnualConsumptionNT,
        ])) {
            const annualConsumption = annualConsumptionVT + annualConsumptionNT;
            const lastAnnualConsumption = lastAnnualConsumptionVT + lastAnnualConsumptionNT;
            return this.count(annualConsumption, lastAnnualConsumption);
        }

        if (annualConsumptionVT && lastAnnualConsumptionVT && annualConsumptionVT !== lastAnnualConsumptionVT) {
            return this.count(annualConsumptionVT, lastAnnualConsumptionVT);
        }

        if (annualConsumptionNT && lastAnnualConsumptionNT && annualConsumptionNT !== lastAnnualConsumptionNT) {
            return this.count(annualConsumptionNT, lastAnnualConsumptionNT);
        }

        return `${R.sum([annualConsumptionNT, annualConsumptionVT])} ${unit}`;
    }
}
