import { Validators } from '@angular/forms';
import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import { CustomValidators } from 'src/common/utils';

export const formFields = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
                CustomValidators.email,
            ],
        ],
        consent: [false, [Validators.requiredTrue]],
    },
    validationMessages: {
        email: {
            required: errorFieldMessages.email.required,
            pattern: errorFieldMessages.email.email,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        consent: {
            required: R.path(
                ['consent', 'signUp', 'required'],
                errorFieldMessages
            ),
        },
    },
};
