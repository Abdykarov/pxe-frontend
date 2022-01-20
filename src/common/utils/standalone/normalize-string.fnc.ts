import * as latinize from 'latinize';
import * as R from 'ramda';

export const normalizeString = R.pipe(R.toLower, latinize);
