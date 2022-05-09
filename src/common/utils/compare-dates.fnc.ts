const compareByDest = (first: string | Date, second: string | Date) =>
    new Date(first).getTime() > new Date(second).getTime();

const compareByAsc = (first: string | Date, second: string | Date) =>
    new Date(first).getTime() < new Date(second).getTime();

export const compareDates = (
    first: string | Date,
    second: string | Date,
    asc = true
) =>
    (asc ? compareByAsc(first, second) : compareByDest(first, second)) ? -1 : 1;
