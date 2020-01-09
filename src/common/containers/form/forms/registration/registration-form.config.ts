import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { CONSTS } from 'src/app/app.constants';
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
                    Validators.maxLength(CONSTS.MAX_LENGTH_EMAIL_SIGN_UP),
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
                alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
                maxlengthRequiredLengthActualLength: errorFieldMessages.email.maxlength,
            },
            consent: {
                required: R.path(
                    [
                        'consent',
                        SignUpType.NewsSubscription === signUpType ? 'newsSubscription' : 'signUp',
                        'required',
                    ],
                    errorFieldMessages,
                ),
            },
        },
    };
}
