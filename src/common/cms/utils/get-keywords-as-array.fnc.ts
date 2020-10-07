import * as R from 'ramda';

export const getKeywordsAsArray = R.map(R.prop('keyword'));
