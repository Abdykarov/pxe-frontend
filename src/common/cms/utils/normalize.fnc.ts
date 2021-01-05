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
        data => !!data['img'],
        data => ({
            ...data,
            img: data.img[0].url,
        }),
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
