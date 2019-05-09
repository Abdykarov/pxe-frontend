import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { SCROLL_TO } from './model/scroll-to,model';

@Injectable({
    providedIn: 'root',
})
export class ScrollToService {
    private scrollRegister = new Subject<SCROLL_TO>();

    constructor(
        private router: Router,
    ) {}

    getScrollStream = () => this.scrollRegister.asObservable();

    activeScrollTo = (scrollTo: SCROLL_TO) => {
        this.scrollRegister.next(scrollTo);
    }

    scrollToSubscription = () => {
        this.router.navigate([''])
            .then(() => {
                const that = this;
                setTimeout(function() {
                    that.activeScrollTo(SCROLL_TO.LANDING_SUBSCRIPTION);
                });
            });
    }
}
