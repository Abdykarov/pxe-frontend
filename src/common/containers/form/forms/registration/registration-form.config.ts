import { Validators } from '@angular/forms';

import * as R from 'ramda';

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
                invalidEmail: errorFieldMessages.email.invalidEmail,
                alreadyRegisteredEmail: errorFieldMessages.email.alreadyRegisteredEmail,
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
