import * as R from 'ramda';

export const totalDigitLengthValidator = (number: string, lenght: number): boolean => R.pipe(
    normalizationFloatingPoint,
    parseFloat,
    getLengthOfNormalizationNumber,
    R.gte(lenght),
)(number);

const normalizationFloatingPoint = number => number.replace(',', '.');
const getLengthOfNormalizationNumber = number => number.toString().replace('.', '').length;
