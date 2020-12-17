import { Validators } from '@angular/forms';

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
    },
    validationMessages: {
        email: {
            required: errorFieldMessages.email.required,
                email: errorFieldMessages.email.email,
                invalidEmail: errorFieldMessages.email.email,
                maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
    },
};
