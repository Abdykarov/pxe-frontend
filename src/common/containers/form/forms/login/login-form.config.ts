import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const loginFormFields: IForm = {
    controls: {
        username: [
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
        code: [
            '',
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        code: {
            required: errorFieldMessages.code.required,
           // code: errorFieldMessages.code.code,//todo custm validate
        },
    },
};
