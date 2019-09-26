import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';

@Component({
    templateUrl: './page.html',
})
export class UserProfilePageComponent {

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
}
