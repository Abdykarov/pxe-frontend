import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
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
        birthDate: [
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
        signatoryPosition: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_POSITION),
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
            'Prikaz',
            [
                Validators.required,
            ],
        ],
        deposit: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(2),
                CustomValidators.minValue(0),
            ],
        ],
        onlyAddress1: [
            false,
        ],
        signatoryName: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_NAME),
                CustomValidators.username,
            ],
        ],
        signatorySurname: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_NAME),
                CustomValidators.username,
            ],
        ],
    },
    validationMessages: {
        namePerson: {
            required: errorFieldMessages.fullName.requiredPerson,
        },
        nameCompany: {
            required: errorFieldMessages.fullName.requiredCompany,
        },
        birthDate: {
            required: errorFieldMessages.birthDate.required,
            bsDate: errorFieldMessages.date.format,
            bsDateMaxDate: errorFieldMessages.birthDate.bsDateMaxDate,
            bsDateMinDate: errorFieldMessages.birthDate.bsDateMinDate,
        },
        ico: {
            required: errorFieldMessages.ico.required,
            ico: errorFieldMessages.ico.invalidIC,
            icoLength: errorFieldMessages.ico.invalidIC,
            minlength: errorFieldMessages.ico.invalidIC,
            maxlength: errorFieldMessages.ico.invalidIC,
        },
        dic: {
            dicPrefix: errorFieldMessages.dic.dicPrefix,
            dicDecimal: errorFieldMessages.dic.dicDecimal,
            dicLength: errorFieldMessages.dic.dicDecimal,
            minlength: errorFieldMessages.dic.dicDecimal,
            maxlength: errorFieldMessages.dic.dicDecimal,
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
        signatoryPosition: {
            required: errorFieldMessages.signatoryPosition.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.signatoryPosition.maxlengthSignatoryPosition,
        },
        signatoryName: {
            required: errorFieldMessages.fullName.requiredSignatoryFirstName,
            maxlengthRequiredLengthActualLength: errorFieldMessages.fullName.maxlengthFirstName,
            username: errorFieldMessages.fullName.patternFirstName,
        },
        signatorySurname: {
            required: errorFieldMessages.fullName.requiredSignatoryLastName,
            maxlengthRequiredLengthActualLength: errorFieldMessages.fullName.maxlengthLastName,
            username: errorFieldMessages.fullName.patternLastName,
        },
        phone: {
            required: errorFieldMessages.phone.requiredMobile,
            mobilePhoneNumber: errorFieldMessages.phone.mobilePhoneNumber,
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
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            minMinActual: errorFieldMessages.deposit.requiredMinValue,
        },
    },
};
