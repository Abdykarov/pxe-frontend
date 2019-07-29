import { TestBed } from '@angular/core/testing';

import { DateDiffPipe } from './date-diff.pipe';


describe('DateDiffPipe', () => {
    let pipe: DateDiffPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateDiffPipe,
            ],
        });

        pipe = TestBed.get(DateDiffPipe);
    });

    it('2019-02-30T22:59:12.133Z diff 2019-03-31T22:59:12.133Z is 1', () => {
        expect(pipe.transform('2019-03-30T22:59:12.133Z', '2019-03-31T22:59:12.133Z', 'days')).toEqual(1);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-29T23:59:12.133Z is 1', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-29T23:59:12.133Z', 'days')).toEqual(1);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-29T22:59:12.132Z is 0', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-29T22:59:12.132Z', 'days')).toEqual(0);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-28T22:59:12.133Z is 0 (hours)', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-28T22:59:12.133Z', 'hours')).toEqual(0);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-28T23:59:12.132Z is 0 (hours)', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-28T23:59:12.132Z', 'hours')).toEqual(0);
    });

    it('2019-03-28T22:59:12.133Z diff 2019-03-28T23:59:12.133Z is 0 (hours)', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-28T23:59:12.133Z', 'hours')).toEqual(1);
    });

    it('2019-01-01T00:00:00.000Z diff 2019-01-04T02:00:59.999Z is 72 (hours)', () => {
        expect(pipe.transform('2019-01-01T01:01:01.000Z', '2019-01-04T01:01:01.000Z', 'hours')).toEqual(72);
    });

    it('2019-01-01T00:00:00.000Z diff 2019-01-04T01:01:01.000Z is 72 (hours)', () => {
        expect(pipe.transform('2019-01-01T01:01:01.000Z', '2019-01-04T01:01:01.000Z', 'hours')).toEqual(72);
    });

    it('2019-01-01T00:00:00.000Z diff 2019-01-04T01:01:00.000Z is 72 (hours)', () => {
        expect(pipe.transform('2019-01-01T01:01:01.000Z', '2019-01-04T01:01:00.000Z', 'hours')).toEqual(71);
    });

    it('2019-04-01T22:00:00.000Z diff 2019-04-02 is 0 (hours)', () => {
        expect(pipe.transform('2019-04-01T22:00:00.000Z', '2019-04-02', 'hours')).toEqual(0);
    });
});
