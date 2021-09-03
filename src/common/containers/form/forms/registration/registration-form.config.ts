import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import {
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';

export function createRegistrationFormFields(signUpType: SignUpType): IForm {
    return {
        controls: {
            email: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
                    CustomValidators.email,
                ],
            ],
        },
        validationMessages: {
            email: {
                required: errorFieldMessages.email.required,
                pattern: errorFieldMessages.email.email,
                invalidEmail: errorFieldMessages.email.email,
                alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
                maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
            },
        },
    };
}
