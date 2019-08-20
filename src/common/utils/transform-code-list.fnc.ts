import * as R from 'ramda';

import { convertArrayToObject } from './convert-array-to-object.fnc';
import {
    ICodelistMap,
    ICodelistOptions,
} from '../graphql/models/supply.model';

export const transformCodeList = (data: ICodelistMap[]): ICodelistOptions => {
    const codeList = convertArrayToObject(data, 'codelistType');
    return R.map(({codelistItems}) => {
        return R.map((codelistItem) => {
            return {
                ...codelistItem,
                key: codelistItem.code,
                value: codelistItem.code,
                label: codelistItem.help || codelistItem.description,
            };
        }, codelistItems);
    }, codeList);
};
