import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { depositPaymentType } from 'src/static/pages/recapitulation/config';
import { getConfigStepper } from 'src/common/utils';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
    templateUrl: './page.html',
})
export class RecapitulationPageComponent {
    public config = getConfigStepper(ProgressStatus.PERSONAL_DATA);

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
        birthDate: new FormControl(),
    });

    submitForm = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }

}
