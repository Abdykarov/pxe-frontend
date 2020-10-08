import * as R from 'ramda';

import { flatData } from './flat-data.fnc';
import { isFlatDataArray } from './is-flat-data-array.fnc';
import { isObject } from 'src/common/utils';

export const normalize = R.cond([
    [
        data => !data,
        data => data,
    ],
    [
        isFlatDataArray,
        R.pipe(
            R.map(flatData),
            R.map(
                R.cond([
                    [
                        Array.isArray,
                        data => R.map(normalize)(data),
                    ],
                    [
                        R.T,
                        data => normalize(data),
                    ],
                ]),
            ),
            R.cond([
                [Array.isArray, array => {
                    if (array.length === 1) {
                        return R.head(array);
                    }
                    return array;
                }],
                [R.T, data => data],
            ]),
        ),
    ],
    [
        isObject,
        data => R.map(normalize)(data),
    ],
    [
        R.T,
        data => data,
    ],
]);
