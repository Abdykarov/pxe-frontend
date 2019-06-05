import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const loginFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
            ],
        ],
        password: [
            '',
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        username: {
            required: errorFieldMessages.email.required,
        },
        password: {
            required: errorFieldMessages.password.required,
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
           // code: errorFieldMessages.code.code,//todo custm validate
        },
    },
};
