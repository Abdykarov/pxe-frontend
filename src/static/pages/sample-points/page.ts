import { Component } from '@angular/core';

import { supplyPointConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class SamplePointsPageComponent {
    public supplyPoint = supplyPointConfig;
}
