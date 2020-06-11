import * as R from 'ramda';

export const operateNestedProperty = (array: object[], path: string[], fnc: Function) => R.pipe(
    R.reduce((result: Object[], obj: object) => {
        result.push(R.path(path, obj));
        return result;
    }, []),
    fnc,
)(array);
