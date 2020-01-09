import * as R from 'ramda';

const getLengthOfNormalizationNumber = number => number.toString().replace('.', '').length;

export const totalDigitLengthValidator = (number: string, lenght: number): boolean => R.pipe(
    R.replace(',', '.'),
    parseFloat,
    getLengthOfNormalizationNumber,
    R.gte(lenght),
)(number);
