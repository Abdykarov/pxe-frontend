import { EanValidator } from 'src/common/utils/ean-validator.fnc';
import { EicValidator } from './eic-validator.fnc';

export class CustomValidators {

    static phoneNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        phoneNumber.markAsTouched();
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

        email.markAsTouched();
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

        ean.markAsTouched();
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

        eic.markAsTouched();
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

        eic.markAsTouched();
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

        ean.markAsTouched();
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

        number.markAsTouched();
        if (expresion.test(number.value)) {
            return null;
        }

        return {
            decimal: true,
        };
    }
}
