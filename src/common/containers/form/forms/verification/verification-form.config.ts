import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        smsCode: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.SMS_CODE),
            ],
        ],
    },
    validationMessages: {
        smsCode: {
            required: errorFieldMessages.smsCode.required,
            invalidSmsCode1: errorFieldMessages.smsCode.invalidSmsCode1,
            invalidSmsCode2: errorFieldMessages.smsCode.invalidSmsCode2,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
            smsCodeAttemptsExceededLimit:
                errorFieldMessages.smsCode.smsCodeAttemptsExceededLimit,
        },
    },
};
