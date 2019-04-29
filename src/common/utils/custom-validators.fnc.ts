import { EanValidator } from 'src/common/utils/ean-validator';

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

    static ean = (ean) => {
        if (ean.pristine) {
            return null;
        }

        ean.markAsTouched();

        if (EanValidator.validate(ean)) {
            return null;
        }

        return {
            ean: true,
        };
    }

}
