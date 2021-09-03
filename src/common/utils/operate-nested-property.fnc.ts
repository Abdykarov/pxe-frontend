import * as R from 'ramda';

export const operateNestedProperty = (path: string[], fnc: Function, array: object[]) => R.pipe(
    R.reduce((result: Object[], obj: object) => {
        result.push(R.path(path, obj));
        return result;
    }, []),
    fnc,
)(array);
