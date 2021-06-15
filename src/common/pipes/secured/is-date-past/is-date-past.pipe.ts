import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { DateDiffPipe } from '../date-diff/date-diff.pipe';

@Pipe({
    name: 'isDatePast',
})
export class IsDatePast implements PipeTransform {

    constructor(
        private dateDiffPipe: DateDiffPipe,
    ) {}

    transform(validTo: string): boolean {
        return this.dateDiffPipe.transform(new Date().toISOString(), validTo, 'seconds') >= 0;
    }
}
