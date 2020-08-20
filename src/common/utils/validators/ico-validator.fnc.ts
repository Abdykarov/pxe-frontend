import {
    always,
    split,
    isEmpty,
    map,
    compose,
    reduce,
    dropLast,
    equals,
    T,
    cond,
    o,
    modulo,
    prop,
    __,
    subtract,
} from 'ramda';

const COUNT_NUMBERS_OF_ICO = 8;
const CONTROL_INDEX = 7;

const countWeightedSum = icArray =>
    compose(
        prop('weightedSum'),
        reduce(
            ({ weightedSum, index }, number) => ({
                weightedSum: weightedSum + number * (COUNT_NUMBERS_OF_ICO - index),
                index: ++index,
            }),
            {
                weightedSum: 0,
                index: 0,
            },
        ),
        dropLast(1),
    )(icArray);

const getCompareParameter = cond([
    [equals(0), always(1)],
    [equals(1), always(0)],
    [T, subtract(11)],
]);

export const verifyIC = ico => {
    const icArray = o(map(parseInt), split(''))(ico);

    if (isEmpty(icArray)) {
        return false;
    }

    return compose(
        equals(icArray[CONTROL_INDEX]),
        getCompareParameter,
        modulo(__, 11),
        countWeightedSum,
    )(icArray);
};
