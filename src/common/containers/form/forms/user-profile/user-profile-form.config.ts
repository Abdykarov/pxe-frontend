import { Validators } from '@angular/forms';

import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';
import { CONSTS } from 'src/app/app.constants';

export const userProfileFormFields: IForm = {
    controls: {
        email: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
        name: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_NAME),
                Validators.pattern(new RegExp(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/, 'u')),
            ],
        ],
        phone: [
            null,
            [
                Validators.required,
                CustomValidators.mobilePhoneNumber,
            ],
        ],
        phonePrefix: [
            // poo mergy prepsat na costantu
            '+420',
            [
                Validators.required,
                CustomValidators.phoneNumberPrefix,
            ],
        ],
    },
    validationMessages: {
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
        },
        name: {
            required: errorFieldMessages.fullName.requiredPerson,
            maxlengthRequiredLengthActualLength: errorFieldMessages.fullName.maxlength,
            pattern: errorFieldMessages.fullName.pattern,
        },
        phone: {
            required: errorFieldMessages.phone.requiredMobile,
            mobilePhoneNumber: errorFieldMessages.phone.mobilePhoneNumber,
        },
        phonePrefix: {
            required: errorFieldMessages.phonePrefix.required,
            phoneNumberPrefix: errorFieldMessages.phonePrefix.invalidPhoneNumberPrefix,
        },
    },
};
