import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const userProfileFormFields: IForm = {
    controls: {
        email: [
            null,
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
        firstName: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_NAME),
                CustomValidators.firstName,
            ],
        ],
        lastName: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_NAME),
                CustomValidators.lastName,
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
            CONSTS.TELEPHONE_PREFIX_CZ,
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
        firstName: {
            required: errorFieldMessages.fullName.requiredPersonFirstName,
            maxlengthRequiredLengthActualLength: errorFieldMessages.fullName.maxlengthFirstName,
            firstName: errorFieldMessages.fullName.patternFirstName,
        },
        lastName: {
            required: errorFieldMessages.fullName.requiredPersonLastName,
            maxlengthRequiredLengthActualLength: errorFieldMessages.fullName.maxlengthLastName,
            lastName: errorFieldMessages.fullName.patternLastName,
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
