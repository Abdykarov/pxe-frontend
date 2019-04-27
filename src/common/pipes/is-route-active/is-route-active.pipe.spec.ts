import { TestBed } from '@angular/core/testing';

import { IsRouteActivePipe } from './is-route-acrive.pipe';

describe('IsRouteActivePipe', () => {
    let pipe: IsRouteActivePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                IsRouteActivePipe,
            ],
        });

        pipe = TestBed.get(IsRouteActivePipe);
    });

    it('/home with /home should be true', () => {
        expect(pipe.transform('/home', '/home')).toBe(true);
    });

    it('/home with / should be false', () => {
        expect(pipe.transform('/home', '/home')).toBe(true);
    });
});
