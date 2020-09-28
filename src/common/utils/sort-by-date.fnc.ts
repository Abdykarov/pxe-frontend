import * as moment from 'moment';

export const sortByDate = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput, asc = true) =>
    (asc ? sortByAsc(first, second) : sortByDest(first, second))
        ? -1 : 1;

const sortByDest = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput) => moment(first).isAfter(second);

const sortByAsc = (first: string | Date | moment.MomentInput, second: string | Date | moment.MomentInput) => moment(first).isBefore(second);
