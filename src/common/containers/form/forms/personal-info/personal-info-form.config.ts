import { FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        name: [
            null,
            [
                Validators.required,
            ],
        ],
        permanentAddress: [
            null,
            [
                Validators.required,
            ],
        ],
        correspondenceAddress: [
            null,
            [],
        ],
        acountNumber: [
            null,
            [
                Validators.required,
            ],
        ],
        acountBankNumber: [
            null,
            [
                Validators.required,
            ],
        ],
        telephone: [
            null,
            [
                Validators.required,
            ],
        ],
        telephonePrefix: [
            null,
            [
                Validators.required,
                CustomValidators.phoneNumberPrefix,
            ],
        ],
        email: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
        onlyPermanentAddress: [
            false,
            [],
        ],
    },
    validationMessages: {
        name: {},
        address: {},
        permanentAddress: {},
        correspondenceAddress: {},
        acountNumber: {},
        acountBankNumber: {},
        telephone: {},
        telephonePrefix: {
            required: errorFieldMessages.name.required,
            maxlength: errorFieldMessages.name.maxlength,
        },
        email: {},
    },
};
