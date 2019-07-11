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
        const from = moment(dateFromString);
        const to = (dateToString.indexOf('T') === -1) ? moment(dateToString).add(1, 'days') : moment(dateToString);
        return to.diff(from, resultUnit);
    }
}
