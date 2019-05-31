import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

import * as R_ from 'ramda-extension';

import { EanValidator } from './ean-validator.fnc';
import { EicValidator } from './eic-validator.fnc';

export class CustomValidators {

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
