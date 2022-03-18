import * as R from 'ramda';

const getLengthOfNumber = (number: number): number => number.toString().length;

export const totalDigitLengthBeforeDecimalPointValidator = (
    number: string | number,
    length: number
): boolean =>
    R.pipe(
        (num: string | number): string => num.toString(),
        R.replace('.', ','),
        parseFloat,
        getLengthOfNumber,
        R.gte(length)
    )(number);
