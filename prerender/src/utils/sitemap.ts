import * as R from 'ramda';

export const getQuestions = (questions) => {
    // if (!R.path(['angularDevstack', 'config', 'includeTestData'], window)) {
    //     return R.reject(
    //         R.pipe(
    //             R.prop('flatData'),
    //             R.propEq('isTestData')(true),
    //         ),
    //     )(questions);
    // }
    return questions;
};

export const getTypeOfArticle = R.pipe(
    R.prop('type'),
    R.reject(R.propEq('url', 'all')),
    R.head,
    R.prop('url')
);

export const getTypes = (types, allType) =>
    R.pipe(
        R.map(R.prop('type')),
        R.flatten,
        R.uniqBy(R.prop('url')),
        R.insert(0, allType),
        R.sortBy(R.prop('order'))
    )(types);
