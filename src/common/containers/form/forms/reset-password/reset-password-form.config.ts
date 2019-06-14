import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const emailFormFields: IForm = {
    controls: {
        contactInfo: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
    },
    validationMessages: {
        contactInfo: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
            alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
        },
    },
};
