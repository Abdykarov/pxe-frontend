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
        const to = moment(dateToString);

        console.log(from);
        console.log(to);

        return to.diff(from, resultUnit);
    }
}
