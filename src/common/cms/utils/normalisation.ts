import * as R from 'ramda';

export const propFlatData = R.prop('flatData');

export const normalizeFag = R.map(propFlatData);

export const normalizeQuestions = (questions) => R.map((question) => {
    const aaa = {...question.flatData};
    aaa.tag = {...aaa.tag[0].flatData};
    return aaa;
})([...questions]);
