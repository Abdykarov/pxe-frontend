import * as R_ from 'ramda-extension';

const accountNumberWeights: number[] = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
const accountNumberPrefixWeights: number[] = [10, 5, 8, 4, 2, 1];

const accountNumberFormatValidator = (
    value: string,
    weights: number[]
): boolean => {
    let sum = 0;

    if (!value.match(/[0-9]+/i)) {
        return false;
    }

    value.split('').forEach((char, i) => {
        sum = sum + weights[i] * parseInt(char, 10);
    });

    return sum % 11 === 0;
};

export const accountNumberPrefixValidator = (accountNumberPrefix) => {
    const value = String(accountNumberPrefix);
    if (!R_.between(2, 6, value.length)) {
        return false;
    }

    return accountNumberFormatValidator(value, accountNumberPrefixWeights);
};

export const accountNumberValidator = (accountNumber) => {
    const value = String(accountNumber);
    if (!R_.between(2, 10, value.length)) {
        return false;
    }

    return accountNumberFormatValidator(value, accountNumberWeights);
};
