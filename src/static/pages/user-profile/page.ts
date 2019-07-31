import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './page.html',
})
export class UserProfilePageComponent {

    public form: FormGroup = new FormGroup({
        name: new FormControl(),
        telephone: new FormControl(),
        telephonePrefix: new FormControl(['+420']),
        email: new FormControl(['ukazka@email.cz']),
    });

    public submitForm = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
