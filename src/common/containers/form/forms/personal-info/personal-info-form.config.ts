import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';

export const formFields: IForm = {
    controls: {
        name: [
            null,
            [
                Validators.required,
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.RECAPITULATION_NAME
                ),
            ],
        ],
        birthDate: [null, [Validators.required]],
        ico: [
            null,
            [
                Validators.required,
                Validators.minLength(CONSTS.VALIDATORS.ICO_LENGTH),
                Validators.maxLength(CONSTS.VALIDATORS.ICO_LENGTH),
                CustomValidators.ico,
            ],
        ],
        dic: [
            null,
            [
                Validators.minLength(CONSTS.VALIDATORS.MIN_LENGTH.DIC),
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.DIC),
                CustomValidators.dic,
            ],
        ],
        address1: [null, [Validators.required]],
        address2: [null, [Validators.required]],
        bankAccountNumber: [
            null,
            [Validators.required, CustomValidators.accountNumber],
        ],
        bankCode: [null, [Validators.required, CustomValidators.bankCode]],
        phone: [
            null,
            [Validators.required, CustomValidators.mobilePhoneNumber],
        ],
        phonePrefix: [
            CONSTS.TELEPHONE_PREFIX_CZ,
            [Validators.required, CustomValidators.phoneNumberPrefix],
        ],
        signatoryPosition: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.POSITION),
            ],
        ],
        email: [
            '',
            [
                Validators.required,
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_RECAPITULATION
                ),
                CustomValidators.email,
            ],
        ],
        depositPaymentTypeId: [null, [Validators.required]],
        deposit: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
            ],
        ],
        onlyAddress1: [false],
        signatoryName: [
            null,
            [
                Validators.required,
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.USER_PROFILE_NAME
                ),
                CustomValidators.username,
            ],
        ],
        signatorySurname: [
            null,
            [
                Validators.required,
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.USER_PROFILE_NAME
                ),
                CustomValidators.username,
            ],
        ],
    },
    validationMessages: {
        namePerson: {
            required: errorFieldMessages.fullName.requiredPerson,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        nameCompany: {
            required: errorFieldMessages.fullName.requiredCompany,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
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
            invalidAddress:
                errorFieldMessages.address.invalidPermanentAddressPerson,
        },
        address1Company: {
            required:
                errorFieldMessages.address.requiredPermanentAddressCompany,
            invalidAddress:
                errorFieldMessages.address.invalidPermanentAddressCompany,
        },
        address2Person: {
            required: errorFieldMessages.address.requiredCurrentAddressPerson,
            invalidAddress:
                errorFieldMessages.address.invalidCurrentAddressPerson,
        },
        address2Company: {
            required: errorFieldMessages.address.requiredCurrentAddressCompany,
            invalidAddress:
                errorFieldMessages.address.invalidCurrentAddressCompany,
        },
        bankAccountNumber: {
            required: errorFieldMessages.bankAccountNumber.required,
            accountNumber: errorFieldMessages.bankAccountNumber.accountNumber,
            accountNumberPrefix:
                errorFieldMessages.bankAccountNumber.accountNumberPrefix,
            accountNumberBoth:
                errorFieldMessages.bankAccountNumber.accountNumberBoth,
        },
        bankCode: {
            required: errorFieldMessages.bankCode.required,
            bankCode: errorFieldMessages.bankCode.bankCode,
        },
        signatoryPosition: {
            required: errorFieldMessages.signatoryPosition.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.signatoryPosition.maxlengthSignatoryPosition,
        },
        signatoryName: {
            required: errorFieldMessages.fullName.requiredSignatoryFirstName,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
            username: errorFieldMessages.fullName.patternFirstName,
        },
        signatorySurname: {
            required: errorFieldMessages.fullName.requiredSignatoryLastName,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
            username: errorFieldMessages.fullName.patternLastName,
        },
        phone: {
            required: errorFieldMessages.phone.requiredMobile,
            mobilePhoneNumber: errorFieldMessages.phone.mobilePhoneNumber,
        },
        phonePrefix: {
            required: errorFieldMessages.phonePrefix.required,
            phoneNumberPrefix:
                errorFieldMessages.phonePrefix.invalidPhoneNumberPrefix,
        },
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
            needChangeEmail: errorFieldMessages.email.alreadyRegisteredEmail,
        },
        depositPaymentTypeId: {
            required: errorFieldMessages.depositPaymentType.required,
        },
        deposit: {
            required: errorFieldMessages.deposit.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            number: errorFieldMessages.number.integer,
            minMinActual: errorFieldMessages.deposit.requiredMinValue,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
    },
};
