import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        name: [
            null,
            [
                Validators.required,
            ],
        ],
        ico: [
            null,
            [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
                CustomValidators.ico,
            ],
        ],
        dic: [
            null,
            [
                Validators.minLength(8),
                Validators.maxLength(10),
                CustomValidators.dic,
            ],
        ],
        address1: [
            null,
            [
                Validators.required,
            ],
        ],
        address2: [
            null,
            [
                Validators.required,
            ],
        ],
        bankAccountNumber: [
            null,
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(17),
                CustomValidators.acountBank,
            ],
        ],
        bankCode: [
            null,
            [
                Validators.required,
                CustomValidators.acountBankCode,
            ],
        ],
        phone: [
            null,
            [
                Validators.required,
                CustomValidators.phoneNumber,
            ],
        ],
        phonePrefix: [
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
        depositPaymentTypeId: [
            null,
            [
                Validators.required,
            ],
        ],
        deposit: [
            null,
            [
                Validators.required,
            ],
        ],
        onlyAddress1: [
            false,
            [],
        ],
    },
    validationMessages: {
        name: {
            required: errorFieldMessages.fullName.required,
        },
        ico: {
            required: errorFieldMessages.ico.required,
            ico: errorFieldMessages.ico.ico,
            icoLength: errorFieldMessages.ico.icoLength,
            minlength: errorFieldMessages.ico.minLength,
            maxlength: errorFieldMessages.ico.maxLength,
        },
        dic: {
            dicPrefix: errorFieldMessages.dic.dicPrefix,
            dicDecimal: errorFieldMessages.dic.dicDecimal,
            dicLength: errorFieldMessages.dic.dicLength,
            minlength: errorFieldMessages.ico.minLength,
            maxlength: errorFieldMessages.ico.maxLength,
        },
        address1: {
            required: errorFieldMessages.address.required,
            invalidAddress: errorFieldMessages.address.invalidAddress,
        },
        address2: {
            invalidAddress: errorFieldMessages.address.invalidAddress,
        },
        bankAccountNumber: {
            required: errorFieldMessages.bankAccountNumber.required,
            invalidAcountNumber: errorFieldMessages.bankAccountNumber.invalidAccountNumber,
        },
        bankCode: {
            required: errorFieldMessages.bankCode.required,
            invalidAcountNumberPrefix: errorFieldMessages.bankCode.invalidAcountNumberPrefix,
        },
        phone: {
            required: errorFieldMessages.phone.required,
            invalidTelephone: errorFieldMessages.phone.invalidTelephone,
        },
        phonePrefix: {
            required: errorFieldMessages.phonePrefix.required,
            invalidTelephonePrefix: errorFieldMessages.phonePrefix.invalidTelephonePrefix,
        },
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.invalidEmail,
        },
        depositPaymentType: {
            required: errorFieldMessages.depositPaymentType.required,
        },
        deposit: {
            required: errorFieldMessages.deposit.required,
        },
    },
};

export const depositPaymentType: IOption[] = [
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

