import { DecimalPipe } from '@angular/common';
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
    private isPowerWithNT = R.all(R_.isTruthy);

    constructor(
       private decimalPipe: DecimalPipe,
    ) {}

    private count = (last: number, avg: number) => {
        return last / (avg / 100) - 100;
    }

    transform(data: ISupplyPoint, unit: string): number | string {
        const {
            annualConsumptionVT = null,
            annualConsumptionNT = null,
            annualConsumption = null,
            lastAnnualConsumptionVT = null,
            lastAnnualConsumptionNT = null,
            lastAnnualConsumption = null,
        } = data;

        if (this.isPowerWithNT([
            annualConsumptionVT,
            annualConsumptionNT,
            lastAnnualConsumptionVT,
            lastAnnualConsumptionNT,
        ])) {
            const countAnnualConsumption = annualConsumptionVT + annualConsumptionNT;
            const countLastAnnualConsumption = lastAnnualConsumptionVT + lastAnnualConsumptionNT;
            if (this.anyProgressInAnnualConsumption(countAnnualConsumption , countLastAnnualConsumption)) {
                return this.count(countAnnualConsumption, countLastAnnualConsumption);
            } else {
                return `${this.decimalPipe.transform(countAnnualConsumption, '1.0-3')} ${unit}`;
            }
        }

        if (this.anyProgressInAnnualConsumption(annualConsumption, lastAnnualConsumption)) {
            return this.count(annualConsumption, lastAnnualConsumption);
        }

        if (this.anyProgressInAnnualConsumption(annualConsumptionVT, lastAnnualConsumptionVT)) {
            return this.count(annualConsumptionVT, lastAnnualConsumptionVT);
        }

        if (this.anyProgressInAnnualConsumption(annualConsumptionNT, lastAnnualConsumptionNT)) {
            return this.count(annualConsumptionNT, lastAnnualConsumptionNT);
        }

        return this.getStingLabel(annualConsumptionNT, annualConsumptionVT, annualConsumption, unit);
    }

    public getStingLabel = (annualConsumptionNT: number, annualConsumptionVT: number, annualConsumption: number, unit: string) =>
        `${this.decimalPipe.transform(R.sum([annualConsumptionNT, annualConsumptionVT, annualConsumption]), '1.0-3')} ${unit}`

    public anyProgressInAnnualConsumption = (curr: number, last: number) => curr && last && curr !== last;

}
