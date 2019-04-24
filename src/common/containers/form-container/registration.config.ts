import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form-container/models/form-definition.model';

export const registrationFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
        consent: [
            false,
            [
                Validators.requiredTrue,
            ],
        ],
    },
    validationMessages: {
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            'already-registered-email': errorFieldMessages.email.alreadyRegisteredEmail,
        },
        consent: {
            required: errorFieldMessages.consent.required,
        },
    },
};
