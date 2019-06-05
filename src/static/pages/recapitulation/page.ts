import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup, Validators,
} from '@angular/forms';

import { configStepper } from './config';
import { depositPaymentType } from '../../../common/containers/form/forms/personal-info/personal-info-form.config';

@Component({
    templateUrl: './page.html',
})
export class RecapitulationPageComponent {
    public config = configStepper;

    public depositPaymentTypeId = depositPaymentType;

    public form: FormGroup = new FormGroup({
        name: new FormControl(),
        address: new FormControl(),
        permanentAddress: new FormControl(),
        correspondenceAddress: new FormControl(),
        acountNumber: new FormControl(),
        acountBankCode: new FormControl(),
        telephone: new FormControl(),
        telephonePrefix: new FormControl(),
        email: new FormControl(),
        onlyAddress1: new FormControl(),
        depositPaymentTypeId: new FormControl(),
        deposit: new FormControl(),
    });

    submitForm = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }

}
