import { FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
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
        telephonePrefix: {},
        email: {},
    },
};
