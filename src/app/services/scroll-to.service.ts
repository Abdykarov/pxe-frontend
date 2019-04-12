import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export enum SCROLL_TO {
    LANDING_SUBSCRIPTION,
}

@Injectable({
    providedIn: 'root',
})
export class ScrollToService {
    private scrollRegister = new Subject<SCROLL_TO>();

    constructor(
        private router: Router,
    ) {}

    getScrollStream() {
       return this.scrollRegister.asObservable();
    }

    activeScrollTo(scrollTo: SCROLL_TO) {
        this.scrollRegister.next(scrollTo);
    }

    scrollToSubscription() {
        this.router.navigate([''])
            .then(() => {
                const that = this;
                setTimeout(function() {
                    that.activeScrollTo(SCROLL_TO.LANDING_SUBSCRIPTION);
                });
            });
    }
}
