import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { NewSupplyPointPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class NewSupplyPointPageComponent {
    public form: FormGroup = new FormGroup({
        commodityType: new FormControl(),
        supplierId: new FormControl(),
        name: new FormControl(),
        ean: new FormControl(),
        address: new FormControl(),
        distributionRateId: new FormControl(),
        circuitBreakerId: new FormControl(),
        annualConsumptionNT: new FormControl(),
        annualConsumptionVT: new FormControl(),
        expirationDate: new FormControl(),
    });

    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}

    public submitAction = () => alert('SUBMIT ACTION');
}
