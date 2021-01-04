import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';

export const formFields = {
    controls: {
        email_ask: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
                Validators.email,
            ],
        ],
        consent_ask: [
            false,
            [
                Validators.requiredTrue,
            ],
        ],
    },
    validationMessages: {
        email_ask: {
            required: errorFieldMessages.email.required,
                email: errorFieldMessages.email.email,
                invalidEmail: errorFieldMessages.email.email,
                maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        consent_ask: {
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
