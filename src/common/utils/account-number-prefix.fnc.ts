import * as R_ from 'ramda-extension';

import { isNormalInteger } from './is-normal-integer.fnc';

export const accountNumberPrefixFnc = (value): boolean => {
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

export const acountNumberPrefixValidator = (value) => {

    if (!R_.between(1, 6, value.length)) {
        return false;
    }

    if (!isNormalInteger(value)) {
        return false;
    }

    return !accountNumberPrefixFnc(value);
};
