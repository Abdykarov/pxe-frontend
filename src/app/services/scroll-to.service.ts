import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { CONSTS } from 'src/app/app.constants';
import { SCROLL_TO } from './model/scroll-to.model';

@Injectable({
    providedIn: 'root',
})
export class ScrollToService {
    private scrollRegister = new Subject<SCROLL_TO>();

    constructor(
        private router: Router,
    ) {}

    public getScrollStream = () => this.scrollRegister.asObservable();

    public activeScrollTo = (scrollTo: SCROLL_TO) => {
        this.scrollRegister.next(scrollTo);
    }

    public scrollToLandingPageFragment = (fragment: SCROLL_TO = SCROLL_TO.LANDING_SUBSCRIPTION) => {
        this.router.navigate([CONSTS.PATHS.EMPTY])
            .then(() => {
                setTimeout(() => {
                    this.activeScrollTo(fragment);
                });
            });
    }
}
