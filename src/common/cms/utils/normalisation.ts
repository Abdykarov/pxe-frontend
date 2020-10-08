import * as R from 'ramda';

import { compareDates } from 'src/common/utils';

export const normalizeNews = R.pipe(
    R.prop('news'),
    R.sort((first, second) => compareDates(first.date, second.date, false)),
);
