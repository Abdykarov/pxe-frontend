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
    transform(dateFromString: string, dateToString: string, resultUnit: unitOfTime.Diff = 'days', withHours = false): number {
        const from = moment(dateFromString);
        const to = moment(dateToString);
        return to.diff(from, resultUnit);
    }
}
