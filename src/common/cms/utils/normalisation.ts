import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { compareDates } from 'src/common/utils';

export const normalizeNews = R.pipe(
    R.head,
    R.prop('news'),
    R.sort((first, second) => compareDates(first.date, second.date, false)),
);

export const normalizeLandingPage = R.map(
    R.cond(
        [
            [R_.isArray, R.head],
            [R.T, data => data],
        ],
    ),
);
