import * as R from 'ramda';

const COUNT_NUMBERS_OF_ICO = 8;
const CONTROL_INDEX = 7;

const countWeightedSum = (icArray: Array<number>): number =>
    R.compose(
        R.prop('weightedSum'),
        R.reduce(
            ({ weightedSum, index }, number) => ({
                weightedSum:
                    weightedSum + number * (COUNT_NUMBERS_OF_ICO - index),
                index: ++index,
            }),
            {
                weightedSum: 0,
                index: 0,
            }
        ),
        R.dropLast(1)
    )(icArray);

const getCompareParameter = R.cond([
    [R.equals(0), R.always(1)],
    [R.equals(1), R.always(0)],
    [R.T, R.subtract(11)],
]);

export const verifyIC = (ico: string): boolean => {
    const icArray: Array<number> = R.o(R.map(parseInt), R.split(''))(ico);

    if (R.isEmpty(icArray)) {
        return false;
    }

    return R.compose(
        R.equals(icArray[CONTROL_INDEX]),
        getCompareParameter,
        R.modulo(R.__, 11),
        countWeightedSum
    )(icArray);
};
