import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        smsCode: [
            null,
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        smsCode: {
            required: errorFieldMessages.smsCode.required,
            invalidSmsCode: errorFieldMessages.smsCode.invalidSmsCode,
        },
    },
};
