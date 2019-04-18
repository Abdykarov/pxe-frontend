import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form-container/models/form-definition.model';

export const loginFormFields: IForm = {
    controls: {
        username: [
            '',
            [
                Validators.required,
                CustomValidators.email,
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
            email: errorFieldMessages.email.email,
        },
        password: {
            required: errorFieldMessages.password.required,
        },
    },
};
