import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const loginFormFields: IForm = {
    controls: {
        login: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN),
            ],
        ],
        password: ['', [Validators.required]],
    },
    validationMessages: {
        login: {
            required: errorFieldMessages.email.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        password: {
            required: errorFieldMessages.password.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
    },
};

export const loginSupplyAuthFormFields: IForm = {
    controls: {
        confirmationCode: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.SMS_CODE),
            ],
        ],
    },
    validationMessages: {
        confirmationCode: {
            required: errorFieldMessages.confirmationCode.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
    },
};
