import { Component } from '@angular/core';

import {
    supplyPointConfigPower,
    supplyPointConfigGas,
} from '../../organisms/supply-point/config';

@Component({
    templateUrl: './page.html',
})
export class SamplePointsPageComponent {
    public supplyPointPower = supplyPointConfigPower;
    public supplyPointGas = supplyPointConfigGas;
}
