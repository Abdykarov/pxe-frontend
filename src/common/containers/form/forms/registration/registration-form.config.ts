import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import {
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';

export function createRegistrationFormFields(signUpType: SignUpType): IForm {
    return {
        controls: {
            email: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(
                        CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN
                    ),
                    CustomValidators.email,
                ],
            ],
        },
        validationMessages: {
            email: {
                required: errorFieldMessages.email.required,
                pattern: errorFieldMessages.email.email,
                invalidEmail: errorFieldMessages.email.email,
                alreadyRegisteredEmail:
                    errorFieldMessages.email.alreadyRegisteredEmail,
                maxlengthRequiredLengthActualLength:
                    errorFieldMessages.string.maxlength,
            },
        },
    };
}
