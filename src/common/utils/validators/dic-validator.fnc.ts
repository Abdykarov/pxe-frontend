import { isPossibleIntegerFnc } from './is-possible-integer.fnc';

export enum DICError {
    PREFIX,
    DECIMAL,
    NONE,
}

export const verifyDIC = (dic: string): DICError => {
    const ALLOWED_COUNTRIES = ['CZ', 'SK'];
    const countryPrefix = dic.substr(0, 2);

    if (ALLOWED_COUNTRIES.indexOf(countryPrefix) === -1) {
        return DICError.PREFIX;
    }

    const dicNumber = dic.substr(2, 100);

    if (!isPossibleIntegerFnc(dicNumber)) {
        return DICError.DECIMAL;
    }

    return DICError.NONE;
};
