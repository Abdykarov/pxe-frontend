import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const emailFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        login: {
            required: errorFieldMessages.email.required,
            emailNotRegistered: errorFieldMessages.email.emailNotRegistered,
            usernameNotRegistered: errorFieldMessages.email.usernameNotRegistered,
            invalidEmail: errorFieldMessages.email.email,
            alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
        },
    },
};
