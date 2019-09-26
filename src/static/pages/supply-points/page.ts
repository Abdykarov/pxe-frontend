import { Component } from '@angular/core';

import {
    supplyPointConfigPower,
    supplyPointConfigGas,
} from 'src/static/organisms/supply-point/config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointsPageComponent {
    public supplyPointPower = supplyPointConfigPower;
    public supplyPointGas = supplyPointConfigGas;

    public badgeAction = () => console.log('Badge clicked');
    public supplyPointAction = () => console.log('Supply point clicked');
}
