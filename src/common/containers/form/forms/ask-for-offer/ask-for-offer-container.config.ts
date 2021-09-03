import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';

export const formFields = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
                Validators.email,
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
                invalidEmail: errorFieldMessages.email.email,
                maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        consent: {
            required: R.path(
                [
                    'consent',
                    'signUp',
                    'required',
                ],
                errorFieldMessages,
            ),
        },
    },
};
