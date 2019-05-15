import { Component } from '@angular/core';

import { 
    supplyPointConfig,
    supplyPointConfigGas
} from './config';

@Component({
    templateUrl: './page.html',
})
export class SamplePointsPageComponent {
    public supplyPoint = supplyPointConfig;
    public supplyPointGas = supplyPointConfigGas;
}
