import * as R from 'ramda';

export const totalDigitLengthValidator = (number: string, lenght: number): boolean => R.pipe(
    normalizationFloatingPoint,
    parseFloat,
    getLengthOfNormalizationNumber,
    (lengthOfNumber) => lengthOfNumber <= lenght,
)(number);

// takhle by bylo lepsi to dat asi do vseho kde resime ten floating point, ale nechal bych to takhle at nic nerozbijem
const normalizationFloatingPoint = number => number.replace(',', '.');
const getLengthOfNormalizationNumber = number => number.toString().replace('.', '').length;

