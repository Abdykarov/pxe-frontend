import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'isDatePast',
})
export class IsDatePast implements PipeTransform {

    transform(validTo: string): boolean {
        const to = moment(validTo);
        const now = moment();
        return to.diff(now) > 0;
    }
}
