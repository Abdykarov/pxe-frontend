import * as R from 'ramda';
import * as R_ from 'ramda-extension';

export const isDataAvailable = R.pipe(R.prop('data'), R_.isNotNil);
