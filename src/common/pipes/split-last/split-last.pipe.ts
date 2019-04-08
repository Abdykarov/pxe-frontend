import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

@Pipe({
  name: 'splitLast',
})
export class SplitLastPipe implements PipeTransform {
    transform(value: string, separator: string): string {
        const splits = value.split(separator);
        if (splits.length > 1) {
            return R.trim(splits.pop());
        } else {
            return value;
        }
    }
}
