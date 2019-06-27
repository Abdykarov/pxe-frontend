import { Component } from '@angular/core';

import {
    supplyPointConfigPower,
    supplyPointConfigGas,
} from 'src/static/organisms/supply-point/config';

@Component({
    templateUrl: './page.html',
})
export class ListSupplyPointsPageComponent {
    public supplyPointPower = supplyPointConfigPower;
    public supplyPointGas = supplyPointConfigGas;
}
