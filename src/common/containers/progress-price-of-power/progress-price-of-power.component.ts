import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { conf } from 'src/common/containers/progress-price-of-power/config';

@Component({
    selector: 'pxe-progress-price-of-power',
    templateUrl: './progress-price-of-power.component.html',
    styleUrls: ['./progress-price-of-power.component.scss'],
})
export class ProgressPriceOfPowerComponent {

    public readonly data = conf;

    constructor() {}
}
