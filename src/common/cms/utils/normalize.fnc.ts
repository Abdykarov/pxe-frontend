import * as R from 'ramda';

import { flatData } from './flat-data.fnc';
import { isFlatDataArray } from './is-flat-data-array.fnc';
import { isObject } from 'src/common/utils';

export const normalize = R.cond([
    [
        (_) => {
            return !_;
        },
        _ => _,
    ],
    [
        isFlatDataArray,
        R.pipe(
            R.map(flatData),
            R.map(
                ARRAY_ITEM => {
                    return R.cond([
                        [
                            Array.isArray,
                            BBB => {
                                return R.map(normalize)(BBB);
                            },
                        ],
                        [
                            R.T,
                            XXX => normalize(XXX),
                        ],
                    ])(ARRAY_ITEM);
                },
            ),
            R.cond([
                [Array.isArray, array => {
                    if (array.length === 1) {
                        return R.head(array);
                    }
                    return array;
                }],
                [R.T, _ => _],
            ]),
        ),
    ],
    [
        isObject,
        _ => {
            return R.map(normalize)(_);
        },
    ],
    [
        R.T,
        _ => {
            return _;
        },
    ],
]);
