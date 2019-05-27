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

    it('2019-03-28T22:59:12.133Z diff 2019-03-29T10:59:12.133Z is 0', () => {
        expect(pipe.transform('2019-03-28T22:59:12.133Z', '2019-03-29T10:59:12.133Z', 'days')).toEqual(0);
    });
});
