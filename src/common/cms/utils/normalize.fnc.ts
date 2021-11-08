import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { isObject } from 'src/common/utils';
import { flatData } from './flat-data.fnc';
import { isFlatDataArray } from './is-flat-data-array.fnc';

export const normalize = R.cond([
    [(data) => !data, (data) => data],
    [
        (data) => !!data['img'] && R_.isArray(data['img']),
        (data) =>
            normalize({
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
                    [Array.isArray, (data) => R.map(normalize)(data)],
                    [R.T, (data) => normalize(data)],
                ])
            )
        ),
    ],
    [isObject, (data) => R.map(normalize)(data)],
    [R.T, (data) => data],
]);
