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
                CustomValidators.accountNumber,
            ],
        ],
        bankCode: [
            null,
            [
                Validators.required,
                CustomValidators.bankCode,
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
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        onlyAddress1: [
            false,
        ],
    },
    validationMessages: {
        namePerson: {
            required: errorFieldMessages.fullName.requiredPerson,
        },
        nameCompany: {
            required: errorFieldMessages.fullName.requiredCompany,
        },
        ico: {
            required: errorFieldMessages.ico.required,
            ico: errorFieldMessages.ico.invalidIC,
            icoLength: errorFieldMessages.ico.invalidIC,
            minlength: errorFieldMessages.ico.invalidIC,
            maxlength: errorFieldMessages.ico.invalidIC,
        },
        dic: {
            dicPrefix: errorFieldMessages.dic.invalidDIC,
            dicDecimal: errorFieldMessages.dic.invalidDIC,
            dicLength: errorFieldMessages.dic.invalidDIC,
            minlength: errorFieldMessages.dic.invalidDIC,
            maxlength: errorFieldMessages.dic.invalidDIC,
        },
        address1Person: {
            required: errorFieldMessages.address.requiredPermanentAddressPerson,
            invalidAddress: errorFieldMessages.address.invalidPermanentAddressPerson,
        },
        address1Company: {
            required: errorFieldMessages.address.requiredPermanentAddressCompany,
            invalidAddress: errorFieldMessages.address.invalidPermanentAddressCompany,
        },
        address2Person: {
            required: errorFieldMessages.address.requiredCurrentAddressPerson,
            invalidAddress: errorFieldMessages.address.invalidCurrentAddressPerson,
        },
        address2Company: {
            required: errorFieldMessages.address.requiredCurrentAddressCompany,
            invalidAddress: errorFieldMessages.address.invalidCurrentAddressCompany,
        },
        bankAccountNumber: {
            required: errorFieldMessages.bankAccountNumber.required,
            accountNumber: errorFieldMessages.bankAccountNumber.accountNumber,
            accountNumberPrefix: errorFieldMessages.bankAccountNumber.accountNumberPrefix,
            accountNumberBoth: errorFieldMessages.bankAccountNumber.accountNumberBoth,
        },
        bankCode: {
            required: errorFieldMessages.bankCode.required,
            bankCode: errorFieldMessages.bankCode.bankCode,
        },
        phone: {
            required: errorFieldMessages.phone.required,
            phoneNumber: errorFieldMessages.phone.invalidPhoneNumber,
        },
        phonePrefix: {
            required: errorFieldMessages.phonePrefix.required,
            phoneNumberPrefix: errorFieldMessages.phonePrefix.invalidPhoneNumberPrefix,
        },
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
        },
        depositPaymentTypeId: {
            required: errorFieldMessages.depositPaymentType.required,
        },
        deposit: {
            required: errorFieldMessages.deposit.required,
            decimal: errorFieldMessages.number.decimal,
            min: errorFieldMessages.number.positive,
        },
    },
};

export const depositPaymentType: IOption[] = [
    {
        key: 'Inkaso',
        value: 'Inkaso',
        label: 'Inkaso',
    },
    {
        key: 'SIPO',
        value: 'SIPO',
        label: 'SIPO',
    },
    {
        key: 'Prikaz',
        value: 'Prikaz',
        label: 'Příkaz k úhradě',
    },
    {
        key: 'Slozenka',
        value: 'Slozenka',
        label: 'Složenkou',
    },
];

