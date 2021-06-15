import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { unitOfTime } from 'moment';

import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Pipe({
    name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
    transform(dateFromString: string, dateToString: string, resultUnit: unitOfTime.Diff = 'days'): number {
        return dateDiff(dateFromString, dateToString, resultUnit);
    }
}
