import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'dayBetweenDays',
})
export class DayBetweenDaysPipe implements PipeTransform {
    transform(dateFromString: string, dateToString: string): number {
        const from = moment(dateFromString);
        const to = moment(dateToString);
        return to.diff(from, 'days');
    }
}
