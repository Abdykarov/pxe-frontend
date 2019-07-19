import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as moment from 'moment';
import { unitOfTime } from 'moment';

@Pipe({
    name: 'dateDiff',
})
export class DateDiffPipe implements PipeTransform {
    transform(dateFromString: string, dateToString: string, resultUnit: unitOfTime.Diff = 'days'): number {
        const from = moment(dateFromString).startOf('day');
        const to = moment(dateToString).startOf('day');
        return to.diff(from, resultUnit);
    }
}
