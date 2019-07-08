import { Component } from '@angular/core';

import {
    supplyPointConfigPower,
    supplyPointConfigGas,
} from 'src/static/organisms/supply-point/config';

import { NewSupplyPointPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class ListSupplyPointsPageComponent {
    public supplyPointPower = supplyPointConfigPower;
    public supplyPointGas = supplyPointConfigGas;

    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}
}
