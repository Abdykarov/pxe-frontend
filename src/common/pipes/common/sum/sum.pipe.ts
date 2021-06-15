import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
    transform(values: number[]): number {
        if (!R_.isArray(values)) {
            return null;
        }
        return R.sum(values);
    }
}


