import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';

@Component({
    templateUrl: './page.html',
})
export class SupplierProfilePageComponent {

    public seriesForm: FormGroup = new FormGroup({
        numberSeriesPrefix: new FormControl(),
        numberSeriesVariable: new FormControl(),
        numberSeriesSuffix: new FormControl(),

    });

    public form: FormGroup = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        telephone: new FormControl(),
        telephonePrefix: new FormControl([CONSTS.TELEPHONE_PREFIX_CZ]),
        email: new FormControl(['ukazka@email.cz']),
    });

    public submitForm = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }

    public actionDeleteAccount = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
