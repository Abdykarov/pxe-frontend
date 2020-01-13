import * as R from 'ramda';

const getLengthOfNumber = number => number.toString().length;


export const totalDigitLengthBeforeDecimalPointValidator = (number: string, lenght: number): boolean => R.pipe(
    R.replace('.', ','),
    parseFloat,
    getLengthOfNumber,
    R.gte(lenght),
)(number);
