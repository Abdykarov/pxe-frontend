import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { mustMatchFnc } from 'src/common/utils/mustMatchFnc';

export const changePasswordFields: IForm = {
    controls: {
        password: [
            '',
            [
                Validators.required,
                CustomValidators.passwordFormat,
            ],
        ],
        confirmPassword: [
            '',
            [
                Validators.required,
                CustomValidators.passwordFormat,
            ],
        ],
    },
    options: {
        validator: mustMatchFnc('password', 'confirmPassword'),
    },
    validationMessages: {
        password: {
            required: errorFieldMessages.password.required,
            pattern: errorFieldMessages.password.pattern,
        },
        confirmPassword: {
            required: errorFieldMessages.password.required,
            pattern: errorFieldMessages.password.pattern,
            mustMatch: errorFieldMessages.password.mustMatch,
        },
    },
};

export const loginSupplyAuthFormFields: IForm = {
    controls: {
        confirmationCode: [
            '',
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        confirmationCode: {
            required: errorFieldMessages.confirmationCode.required,
        },
    },
};
