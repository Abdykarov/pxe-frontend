import { FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        fullName: [
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
            [
                Validators.required,
            ],
        ],
        acountNumber: [
            null,
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(17),
                CustomValidators.acountBank,
            ],
        ],
        acountBankCode: [
            null,
            [
                Validators.required,
                CustomValidators.acountBankCode,
            ],
        ],
        telephone: [
            null,
            [
                Validators.required,
                CustomValidators.phoneNumber,
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
        methodOfPaymentOfAdvances: [
            null,
            [
                Validators.required,
            ],
        ],
        advances: [
            null,
            [
                Validators.required,
            ],
        ],
        onlyPermanentAddress: [
            false,
            [],
        ],
    },
    validationMessages: {
        advances: {
            required: errorFieldMessages.advances.required,
        },
        fullName: {
            required: errorFieldMessages.fullName.required,
        },
        permanentAddress: {
            required: errorFieldMessages.address.required,
            invalidAddress: errorFieldMessages.address.invalidAddress,
        },
        correspondenceAddress: {
            invalidAddress: errorFieldMessages.address.invalidAddress,
        },
        acountNumber: {
            required: errorFieldMessages.acountNumber.required,
            invalidAcountNumber: errorFieldMessages.acountNumber.invalidAcountNumber,
        },
        acountNumberPrefix: {
            required: errorFieldMessages.acountNumberPrefix.required,
            invalidAcountNumberPrefix: errorFieldMessages.acountNumberPrefix.invalidAcountNumberPrefix,
        },
        methodOfPaymentOfAdvances: {
            required: errorFieldMessages.methodOfPaymentOfAdvances.required,
        },
        telephone: {
            required: errorFieldMessages.telephone.required,
            invalidTelephone: errorFieldMessages.telephone.invalidTelephone,
        },
        telephonePrefix: {
            required: errorFieldMessages.telephonePrefix.required,
            invalidTelephonePrefix: errorFieldMessages.telephonePrefix.invalidTelephonePrefix,
        },
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.invalidEmail,
        },
    },
};

export const methodOfPaymentOfAdvances: IOption[] = [
    {
        key: 1,
        value: 1,
        label: 'Inkaso',
    },
    {
        key: 2,
        value: 2,
        label: 'SIPO',
    },
    {
        key: 3,
        value: 3,
        label: 'Příkaz k úhradě',
    },
    {
        key: 4,
        value: 4,
        label: 'Složenkou',
    },
];

