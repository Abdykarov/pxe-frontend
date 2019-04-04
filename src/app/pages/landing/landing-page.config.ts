import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';

export const loginFormFields = {
    username: ['', Validators.required],
    password: ['', Validators.required],
};

export const subscriptionFormFields = {
    email: ['', [
        Validators.required,
        CustomValidators.email,
    ]],
    consent: [false, CustomValidators.consent],
};
