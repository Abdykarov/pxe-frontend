import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { inArray } from 'src/common/utils';

@Pipe({
    name: 'inArray',
})
export class InArrayPipe implements PipeTransform {

    transform(array: any[], item: any): boolean {
        return R.find(data => data.url === item)(array);
    }
}
