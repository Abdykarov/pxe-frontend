import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
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
            invalidSmsCode: errorFieldMessages.smsCode.invalidSmsCode,
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
            smsCodeAttemptsExceededLimit: errorFieldMessages.smsCode.smsCodeAttemptsExceededLimit,
        },
    },
};
