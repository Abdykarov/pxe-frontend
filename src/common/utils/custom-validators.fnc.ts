import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

import * as R_ from 'ramda-extension';

export class CustomValidators {

    static phoneNumber = (phoneNumber) => {
        if (phoneNumber.pristine) {
            return null;
        }

        phoneNumber.markAsTouched();
        if (/^(\+420)?[0-9]{9}$|^(\+){1}[0-9]{10,20}$/.test(phoneNumber.value)) {
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

    static isDecimal = (): ValidatorFn => {
        const expresion = new RegExp(/^(\d*([\.\,]\d+)?)$/);
        return (control: AbstractControl): ValidationErrors => {
            if (control.pristine) {
                return null;
            }

            control.markAsTouched();
            if (R_.isNilOrEmpty(control.value) || expresion.test(control.value)) {
                return null;
            }

            return {
                decimal: true,
            };
        };
    }
}
