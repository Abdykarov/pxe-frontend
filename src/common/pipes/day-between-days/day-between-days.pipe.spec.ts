import { TestBed } from '@angular/core/testing';

import { DayBetweenDaysPipe } from './day-between-days.pipe';

describe('DayBetweenDaysPipe', () => {
    let pipe: DayBetweenDaysPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DayBetweenDaysPipe,
            ],
        });

        pipe = TestBed.get(DayBetweenDaysPipe);
    });

    it('2019-02-30T22:59:12.133Z diff 2019-03-31T22:59:12.133Z is 1', () => {
        expect(pipe.transform('2019-03-30T22:59:12.133Z', '2019-03-31T22:59:12.133Z')).toEqual(1);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-29T23:59:12.133Z is 1', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-29T23:59:12.133Z')).toEqual(1);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-29T10:59:12.133Z is 0', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-29T10:59:12.133Z')).toEqual(0);
    });
});
