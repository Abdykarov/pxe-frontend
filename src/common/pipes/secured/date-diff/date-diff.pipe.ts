import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import {
    Moment,
    unitOfTime,
} from 'moment';

import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Pipe({
    name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
    transform(dateFromString: string | Moment, dateToString: string | Moment, resultUnit: unitOfTime.Diff = 'days'): number {
        return dateDiff(dateFromString, dateToString, resultUnit);
    }
}
