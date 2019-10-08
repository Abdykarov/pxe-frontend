import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const emailFormFields: IForm = {
    controls: {
        login: [
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
            invalidEmail: errorFieldMessages.email.email,
            alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
        },
    },
};
