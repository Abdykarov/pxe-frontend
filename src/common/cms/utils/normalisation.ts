import * as R from 'ramda';

import { compareDates } from 'src/common/utils';

export const propFlatData = R.prop('flatData');

export const normalizeFag = R.map(propFlatData);

const sortById = R.ascend(R.prop('id'));

export const getFlatData = R.pathOr({}, [0, 'flatData']);

export const mapFlatAttribute = (attribute) => (source) => {
    const dataWithoutFlat = getFlatData(source[attribute]);
    source[attribute] = {...dataWithoutFlat};
    return source;
};

const removeFlatDataFromTagQuestion = (question) => {
    const flatQuestion = {...question.flatData};
    flatQuestion.tag = flatQuestion.tag[0].flatData;
    return flatQuestion;
};

export const normalizeQuestions = (questions) => R.pipe(
    R.map(removeFlatDataFromTagQuestion),
    R.sort(sortById),
)(questions);

export const normalizeNews = R.pipe(
    getFlatData,
    R.prop('news'),
    R.sort((first, second) => compareDates(first.date, second.date, false)),
);

export const normalizeLandingPage = R.pipe(
    getFlatData,
    R.map(getFlatData),
);

export const normalizeCookie = R.pipe(
    getFlatData,
    mapFlatAttribute('seo'),
);

