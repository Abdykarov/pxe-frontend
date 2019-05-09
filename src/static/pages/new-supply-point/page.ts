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
        supplierId: new FormControl(),
        distributionRateId: new FormControl(),
        circuitBreakerId: new FormControl(),
        expirationDate: new FormControl(),
        address: new FormControl(),
    });

    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}

    public openModal = () => alert('MODAL OPENED');

    public submitAction = () => alert('SUBMIT ACTION');
}
