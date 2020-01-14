import * as R from 'ramda';

const getLengthOfNumber = (number: number): number => number.toString().length;

export const totalDigitLengthBeforeDecimalPointValidator = (number: string, length: number): boolean => R.pipe(
    R.replace('.', ','),
    parseFloat,
    getLengthOfNumber,
    R.gte(length),
)(number);
