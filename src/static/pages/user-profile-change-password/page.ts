import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './page.html',
})
export class UserProfileChangePasswordPageComponent {
    public form: FormGroup = new FormGroup({
        currentPassword: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
    });

    public submitForm = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };
}
