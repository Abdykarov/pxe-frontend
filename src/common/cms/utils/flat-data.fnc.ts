import * as R from 'ramda';

export const flatData = R.prop('flatData');

export const removeFlatData = R.pipe(R.head, flatData);
