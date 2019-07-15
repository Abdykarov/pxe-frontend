import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

import * as R_ from 'ramda-extension';

import {
    accountNumberValidator,
    accountNumberPrefixValidator,
} from './account-number.fnc';
import {
    DICError,
    verifyDIC,
} from './dic-validator.fnc';
import { EanValidator } from './ean-validator.fnc';
import { EicValidator } from './eic-validator.fnc';
import {
    isValidLandlineNumber,
    isValidMobilePhoneNumber,
    isValidTelephoneNumber,
} from './phone.validator.fnc';
import { verifyIC } from './ico-validator.fnc';

export class CustomValidators {

    static accountNumber = (acountNumber) => {
        if (acountNumber.pristine) {
            return null;
        }

        const value = acountNumber.value;
        const accountParts = acountNumber.value.split('-');

        if (accountParts.length === 1) {
            if (accountNumberValidator(value)) {
                return null;
            } else {
                return {
                    accountNumber: true,
                };
            }
        }

        if (accountParts.length === 2) {
            const prefix = accountParts[0];
            const number = accountParts[1];

            if (!accountNumberValidator(number) && !accountNumberPrefixValidator(prefix)) {
                return {
                    accountNumber: {
                        both: true,
                    },
                };
            }

            if (!accountNumberValidator(number)) {
                return {
                    accountNumber: true,
                };
            }

            if (!accountNumberPrefixValidator(prefix)) {
                return {
                    accountNumber: {
                        prefix: true,
                    },
                };
            }

            return null;
        }

        return {
            accountNumber: true,
        };
    }

    static bankCode = (acountBankCode) => {
        if (acountBankCode.pristine) {
            return null;
        }

        const ACOUNT_BANK_NUMBER = /^\d{4}$/;
        if (ACOUNT_BANK_NUMBER.test(acountBankCode.value)) {
            return null;
        }

        return {
            bankCode: true,
        };
    }

    static phoneNumberPrefix = (phoneNumberPrefix) => {
        if (phoneNumberPrefix.pristine) {
            return null;
        }

        const PHONE_REGEXP = /^(\+420)$/;
        if (PHONE_REGEXP.test(phoneNumberPrefix.value)) {
            return null;
        }

        return {
            phoneNumberPrefix: true,
        };
    }

    static phoneNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        if (isValidTelephoneNumber(phoneNumber.value)) {
            return null;
        }

        return {
            phoneNumber: true,
        };
    }

    static mobilePhoneNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        if (isValidMobilePhoneNumber(phoneNumber.value)) {
            return null;
        }

        return {
            mobilePhoneNumber: true,
        };
    }

    static landLineNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        if (isValidLandlineNumber(phoneNumber.value)) {
            return null;
        }

        return {
            landLineNumber: true,
        };
    }

    static conditionalValidator(condFn: (control: AbstractControl) => boolean,
                                             validators: ValidatorFn | ValidatorFn[]): ValidatorFn {
        return (control) => {
            if (!condFn(control)) {
                return null;
            }

            if (!Array.isArray(validators)) {
                return validators(control);
            }

            return validators.map(v => v(control)).reduce((errors, result) =>
                result === null ? errors :
                    (Object.assign(errors || {}, result)),
            );
        };
    }

    static email = (email) => {
        if (email.pristine) {
            return null;
        }

        const EMAIL_REGEXP = new RegExp('^[a-zA-Z0-9!#$%&amp;&apos;\*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&amp;' +
            '&apos;\*+/=?^_`{|}~-]+)*@(([a-zA-Z0-9]([-a-zA-Z0-9]*[a-zA-Z0-9]+)?){1,63}\.)+([a-zA-Z0-9](' +
            '[-a-zA-Z0-9]*[a-zA-Z0-9]+)?){2,63}$');
        if (EMAIL_REGEXP.test(email.value)) {
            return null;
        }

        return {
            email: true,
        };
    }

    static ean = (ean) => {
        if (ean.pristine) {
            return null;
        }

        if (EanValidator.validate(ean.value)) {
            return null;
        }

        return {
            ean: true,
        };
    }

    static ico = (ico): {} => {
        if (ico.pristine || R_.isNilOrEmpty(ico.value)) {
            return null;
        }

        const icoArray = ico.value.split('').map(item => parseInt(item, 10));

        if (verifyIC(icoArray)) {
            return null;
        }

        return {
            ico: true,
        };

    }

    static dic = (dic): {} => {
        if (dic.pristine || R_.isNilOrEmpty(dic.value)) {
            return null;
        }

        switch (verifyDIC(dic.value)) {
            case DICError.NONE:
                return null;
            case DICError.PREFIX:
                return {
                    dicPrefix: true,
                };
            case DICError.DECIMAL:
                return {
                    dicDecimal: true,
                };
        }
    }

    static eic = (eic) => {
        if (eic.pristine) {
            return null;
        }

        if (EicValidator.validate(eic.value)) {
            return null;
        }

        return {
            eic: true,
        };
    }

    static eicFormat = (eic) => {
        if (eic.pristine) {
            return null;
        }

        const EIC_REGEXP = /^27Z|zG|g.{12}$/;
        if (EIC_REGEXP.test(eic.value)) {
            return null;
        }

        return {
            pattern: true,
        };
    }

    static eanFormat = (ean) => {
        if (ean.pristine) {
            return null;
        }

        const EAN_REGEXP = /^8591824\d{11}$/;
        if (EAN_REGEXP.test(ean.value)) {
            return null;
        }

        return {
            pattern: true,
        };
    }

    static isNumber = (number) => {
        const expresion = new RegExp(/^(0|-?[1-9]\d*)$/);
        if (number.pristine) {
            return null;
        }

        if (expresion.test(number.value)) {
            return null;
        }

        return {
            number: true,
        };
    }


    static isDecimal = (number) => {
        const expresion = new RegExp(/^-?\d+([\.\,]?\d+)?$/);
        if (number.pristine) {
            return null;
        }

        if (expresion.test(number.value)) {
            return null;
        }

        return {
            decimal: true,
        };
    }

    static minValue = (min: number, allowEqual = false, plainError = true): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors => {
            if (control.pristine) {
                return null;
            }

            if (!allowEqual &&
                (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) > min)) {
                return null;
            }

            if (allowEqual &&
                (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) >= min)) {
                return null;
            }


            return {
                min: plainError ? true : {min, actual: control.value},
            };
        };
    }

    static maxValue = (max: number, allowEqual = false, plainError = true): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors => {
            if (control.pristine) {
                return null;
            }

            if (!allowEqual &&
                (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) < max)) {
                return null;
            }

            if (allowEqual &&
                (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) <= max)) {
                return null;
            }

            return {
                max: plainError ? true : {max, actual: control.value},
            };
        };
    }

    static passwordFormat = (password) => {
        if (password.pristine) {
            return null;
        }

        const PASSWORD_REGEXP =
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1})(?=(.*[a-zA-Z]){8,}).*$/;

        if (PASSWORD_REGEXP.test(password.value)) {
            return null;
        }

        return {
            pattern: true,
        };
    }
}
