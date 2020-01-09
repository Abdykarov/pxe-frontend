import * as R from 'ramda';

export const totalDigitLengthValidator = (number: string, lenght: number): boolean => R.pipe(
    R.replace(',', '.'),
    parseFloat,
    getLengthOfNormalizationNumber,
    R.gte(lenght),
)(number);

const getLengthOfNormalizationNumber = number => number.toString().replace('.', '').length;
