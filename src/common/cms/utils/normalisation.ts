import * as R from 'ramda';

export const propFlatData = R.prop('flatData');

export const normalizeFag = R.map(propFlatData);

const sortById = R.ascend(R.prop('id'));

export const normalizeQuestions = (questions) => R.pipe(
    R.map((question) => {
        const aaa = {...question.flatData};
        aaa.tag = {...aaa.tag[0].flatData};
        return aaa;
    }),
    R.sort(sortById),
)([...questions]);

export const getFlatData = R.pathOr({}, [0, 'flatData']);
