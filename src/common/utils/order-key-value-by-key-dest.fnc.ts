import { KeyValue } from '@angular/common';

export const orderKeyValueByKeyDest = (a: KeyValue<number, object>, b: KeyValue<number, object>): any => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
};
