import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const changePasswordFields: IForm = {
    controls: {
        password: [
            '',
            [
                Validators.required,
            ],
        ],
        passwordConfirm: [
            '',
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        password: {
            required: errorFieldMessages.password.required,
        },
        passwordConfirm: {
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
        },
    },
};
