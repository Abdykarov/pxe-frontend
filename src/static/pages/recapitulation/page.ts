import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { configStepper } from './config';

@Component({
    templateUrl: './page.html',
})
export class RecapitulationPageComponent {
    public form: FormGroup = new FormGroup({
        name: new FormControl(),
        address: new FormControl(),
        permanentAddress: new FormControl(),
        correspondenceAddress: new FormControl(),
        acountNumber: new FormControl(),
        acountBankNumber: new FormControl(),
        telephone: new FormControl(),
        telephonePrefix: new FormControl(),
        email: new FormControl(),
    });

    public config = configStepper;


    submitForm = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }

}
