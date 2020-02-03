import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
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
            usernameNotRegistered: errorFieldMessages.email.usernameNotRegistered,
            invalidEmail: errorFieldMessages.email.email,
            alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
    },
};
