import * as R from 'ramda';

export const apolloGetOperationName = R.pipe(
    R.path(['query', 'definitions']),
    R.head,
    R.path(['name', 'value'])
);
