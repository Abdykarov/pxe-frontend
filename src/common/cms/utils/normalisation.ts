import * as R from 'ramda';

import { compareDates } from 'src/common/utils';
import { flatData } from './flat-data.fnc';

export const normalizeFagConfig = R.map(flatData);

const sortById = R.ascend(R.prop('id'));

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
    R.prop('news'),
    R.sort((first, second) => compareDates(first.date, second.date, false)),
);
