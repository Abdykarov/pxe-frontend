import { appendStringToSpecPosition } from 'src/common/utils/append-string-to-spec-position.fnc';

export const appendStringToSpecPositions = (str: string, indexes: number[], value: string): string => {
    for (let i = 0; i < indexes.length; i++) {
        str = appendStringToSpecPosition(str, indexes[i] + i, value);
    }
    return str;
};
