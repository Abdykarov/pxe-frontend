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
        console.log('%c ***** email *****', 'background: #bada55; color: #000; font-weight: bold', email);
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

    static consent = (consent) => {
        console.log('%c ***** consent *****', 'background: #bada55; color: #000; font-weight: bold', consent);
        if (consent.pristine) {
            return null;
        }

        consent.markAsTouched();
        if (/^true$/.test(consent.value)) {
            return null;
        }

        return {
            consent: true,
        };
    }
}
