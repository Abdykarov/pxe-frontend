import * as moment from 'moment';

const compareByDest = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput) =>
    moment(first).isAfter(second);

const compareByAsc = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput) =>
    moment(first).isBefore(second);

export const compareDates = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput, asc = true) =>
    (asc ? compareByAsc(first, second) : compareByDest(first, second))
        ? -1 : 1;
