import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';
import { fieldsMustMatch } from 'src/common/utils/validators/fields-must-match.fnc';
import { fieldsMustNotMatch } from 'src/common/utils/validators/fields-must-not-match.fnc';

export const changePasswordFields: IForm = {
    controls: {
        currentPassword: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.PASSWORD),
            ],
        ],
        password: [
            '',
            [
                Validators.required,
                CustomValidators.passwordFormat,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.PASSWORD),
            ],
        ],
        confirmPassword: ['', [Validators.required]],
    },
    options: {
        validator: [
            fieldsMustMatch('password', 'confirmPassword'),
            fieldsMustNotMatch('currentPassword', 'password'),
        ],
    },
    validationMessages: {
        currentPassword: {
            required: errorFieldMessages.password.currentRequired,
            invalidCurrentPassword:
                errorFieldMessages.password.invalidCurrentPassword,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        password: {
            required: errorFieldMessages.password.required,
            pattern: errorFieldMessages.password.pattern,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
            fieldsMustNotMatch: errorFieldMessages.password.fieldsMustNotMatch,
        },
        confirmPassword: {
            required: errorFieldMessages.password.required,
            pattern: errorFieldMessages.password.pattern,
            fieldsMustMatch: errorFieldMessages.password.fieldsMustMatch,
        },
    },
};

export const loginSupplyAuthFormFields: IForm = {
    controls: {
        confirmationCode: ['', [Validators.required]],
    },
    validationMessages: {
        confirmationCode: {
            required: errorFieldMessages.confirmationCode.required,
        },
    },
};
