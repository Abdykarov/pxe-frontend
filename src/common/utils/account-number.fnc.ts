import * as R_ from 'ramda-extension';

import { isNormalInteger } from './is-normal-integer.fnc';

export const accountNumber = (value): boolean => {
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

export const acountNumberValidator = (value) => {
    if (value.indexOf('-') !== -1) {
        console.log('-');
        return false;
    }

    if (!isNormalInteger(value)) {
        return false;
    }

    if (!R_.between(2, 10, value.length)) {
        return false;
    }

    return !accountNumber(value);
};
