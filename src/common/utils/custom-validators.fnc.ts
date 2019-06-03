import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

import * as R_ from 'ramda-extension';

import { EanValidator } from './ean-validator.fnc';
import { EicValidator } from './eic-validator.fnc';

export class CustomValidators {

    static acountBank = (acountBank) => {
        if (acountBank.pristine) {
            return null;
        }

        const accountNumberValidator = function (value) {
            const An: string = String(value);
            const AnPrefixKfc: number[] = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

            let AnPrefixNumber: any = 0;
            let err = false;
            let AnNumber = '';
            let ch: string;

            if (An === '0') {
                err = true;
            }

            for (let i = 0; i < An.length; i++) {
                ch = An.charAt(i);
                if (ch.match(/[0-9 -]/i)) {
                    if (ch !== '-') {
                        AnNumber = AnNumber + ch;
                    }
                } else {
                    err = true;
                }
            }
            if (!err) {
                const AnPrefix = AnNumber;
                for (let i = 0; i < AnPrefix.length; i++) {
                    AnPrefixNumber = AnPrefixNumber + (AnPrefixKfc[i] *  parseInt(AnPrefix.charAt(i), 10));
                }
                if (AnPrefixNumber % 11 !== 0) {
                    err = true;
                }
            } else {
                err = true;
            }

            return !err;
        };

        if (!accountNumberValidator(acountBank.value)) {
            return null;
        }

        return {
            acount: true,
        };
    }

    static acountBankNumber = (acountBankNumber) => {
        if (acountBankNumber.pristine) {
            return null;
        }

        const accountNumberPrefixValidator = (value): boolean => {
            const AnPrefixKfc: number[] = [10, 5, 8, 4, 2, 1];
            const An = String(value);

            let AnPrefixNumber = 0;
            let ch: string;
            let err = false;
            let AnNumber = '';

            // we need to check string undefined and null, coz they are provided if value is empty in field
            if (An.length && An !== 'undefined' && An !== 'null') {
                for (let i = 0; i < An.length; i++) {
                    ch = An.charAt(i);
                    if (ch.match(/[0-9 -]/i)) {
                        if (ch !== '-') {
                            AnNumber = AnNumber + ch;
                        }
                    } else {
                        err = true;
                    }
                }

                if (!err) {
                    const AnPrefix = AnNumber;
                    for (let i = 0; i < AnPrefix.length; i++) {
                        AnPrefixNumber = AnPrefixNumber + (AnPrefixKfc[i] * parseInt(AnPrefix.charAt(i), 10));
                    }
                    if (AnPrefixNumber % 11 !== 0) {
                        err = true;
                    }
                } else {
                    err = true;
                }
            }

            return !err;
        };

        if (accountNumberPrefixValidator(acountBankNumber.value)) {
            return null;
        }

        return {
            pattern: true,
        };
    }

    static phoneNumberPrefix = (phoneNumberPrefix) => {
        if (phoneNumberPrefix.pristine) {
            return null;
        }

        const PHONE_REGEXP = /^(\+420)|(\+421)$/;
        if (PHONE_REGEXP.test(phoneNumberPrefix.value)) {
            return null;
        }

        return {
            pattern: true,
        };
    }

    static phoneNumberDeep = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        const phonePrefixes = ['2', '31', '32', '35', '37', '38', '39', '41', '46', '47', '48', '49', '51', '53',
            '54', '55', '56', '57', '58', '59', '95', '971', '972', '973', '974', '840114114', '972436321',
            '973315650', '975853100'];
        const mobilePrefixes = ['60', '70', '72', '73', '77', '79'];
        const pattern = /^[0-9]{9}$/i;
        const patternWithSpaces = /^[0-9]{3}[ ][0-9]{3}[ ][0-9]{3}$/i;

        const isValidPhone = (value) => {
            return (pattern.test(value) || patternWithSpaces.test(value)) && searchPrefixes(phonePrefixes, value);
        };

        const isValidMobile = (value) => {
            return (pattern.test(value) || patternWithSpaces.test(value)) && searchPrefixes(mobilePrefixes, value);
        };

        const searchPrefixes = (prefixes, value) => {
            value = value.replace(/ /g, '');
            let j = Number.MAX_VALUE;
            for (let i = 0; i < prefixes.length; i++) {
                if (value.indexOf(prefixes[i]) === 0) {
                    j = i;
                    break;
                }
            }
            return j < prefixes.length && value.substring(0, 2) !== '20';
        };

        if (isValidMobile(phoneNumber) || isValidPhone(phoneNumber)) {
            return null;
        }

        return {
            phoneNumber: true,
        };
    }

    static phoneNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        const PHONE_REGEXP = /^(\+420)?[0-9]{9}$|^(\+){1}[0-9]{10,20}$/;
        if (PHONE_REGEXP.test(phoneNumber.value)) {
            return null;
        }

        return {
            pattern: true,
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


    static isDecimal = (number) => {
        const expresion = new RegExp(/^(\d*([\.\,]\d+)?)$/);
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

    static minValue = (min: number): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors => {
            if (control.pristine) {
                return null;
            }

            if (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) > min) {
                return null;
            }

            return {
                min: true,
            };
        };
    }

    static maxValue = (max: number): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors => {
            if (control.pristine) {
                return null;
            }

            if (R_.isNilOrEmpty(control.value) || parseFloat(control.value.toString().replace(',', '.')) < max) {
                return null;
            }

            return {
                max: true,
            };
        };
    }
}
