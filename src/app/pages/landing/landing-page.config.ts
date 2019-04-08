import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';

export const loginFormFields = {
    username: ['', Validators.required],
    password: ['', Validators.required],
};

export const subscriptionFormFields = {
    controls: {
        email: ['', [
            Validators.required,
            CustomValidators.email,
        ]],
        consent: [false, [
            Validators.requiredTrue,
        ]],
    },
    validationMessages: {
        email: {
            required: 'Zadejte svůj e-mail.',
            email: 'E-mail není ve správném formátu.',
        },
        consent: {
            required: 'Musíte souhlasit se zásadami bezpečnosti.',
        },
    },
};

