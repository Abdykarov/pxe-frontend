import { Validators } from '@angular/forms';

export const loginFormFields = {
    username: ['', Validators.required],
    password: ['', Validators.required],
};
