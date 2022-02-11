import { Validators } from '@angular/forms';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const emailFormFields: IForm = {
    controls: {
        login: ['', [Validators.required]],
    },
    validationMessages: {
        login: {
            required: errorFieldMessages.email.required,
            invalidEmail: errorFieldMessages.email.email,
            alreadyRegisteredEmail:
                errorFieldMessages.email.alreadyRegisteredEmail,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
    },
};
