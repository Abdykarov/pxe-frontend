import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Pipe({
    name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
    transform(dateFromString: string, dateToString: string, resultUnit: string = 'days'): number {
        return 2;
    }
}
