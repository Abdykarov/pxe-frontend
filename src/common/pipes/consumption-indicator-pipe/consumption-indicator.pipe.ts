import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';

@Pipe({
  name: 'consumptionIndicator',
})
export class ConsumptionIndicatorPipe implements PipeTransform {
    private andTruthy = (val) => {
        return !!val;
    }

    private isBoth = (data) => {
        const { annualConsumptionVT, annualConsumptionNT, lastAnnualConsumptionVT, lastAnnualConsumptionNT} = data;
        return R.all(this.andTruthy)(
            [
                annualConsumptionVT,
                annualConsumptionNT,
                lastAnnualConsumptionVT,
                lastAnnualConsumptionNT,
            ]);
    }

    private count = (avg: number, last: number) => {
        return last / (avg / 100) - 100;
    }

    transform(data: ISupplyPointFindData, unit: string): number | string {
        const { annualConsumptionVT, annualConsumptionNT, lastAnnualConsumptionVT, lastAnnualConsumptionNT} = data;

        if (this.isBoth(data)) {
            const annualConsumption = annualConsumptionVT + annualConsumptionNT;
            const lastAnnualConsumption = lastAnnualConsumptionVT + lastAnnualConsumptionNT;
            return this.count(annualConsumption, lastAnnualConsumption);
        }

        if (annualConsumptionVT && lastAnnualConsumptionVT) {
            return this.count(annualConsumptionVT, lastAnnualConsumptionVT);
        }

        if (annualConsumptionNT && lastAnnualConsumptionNT) {
            return this.count(annualConsumptionNT, lastAnnualConsumptionNT);
        }

        return `${String(R.sum([lastAnnualConsumptionNT, lastAnnualConsumptionVT]))} ${unit}`;
    }
}
