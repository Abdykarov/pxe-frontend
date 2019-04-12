import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
    SCROLL_TO,
    ScrollService,
} from './scroll-register';

@Injectable({
    providedIn: 'root',
})
export class ScrollToSubscriptionService {

    constructor(
        private scrollService: ScrollService,
        private router: Router,
    ) {}

    scrollToSubscription() {
        this.router.navigate([''], {})
            .then(() => {
                const that = this;
                setTimeout(function() {
                    that.scrollService.activeScrollTo(SCROLL_TO.LANDING_SUBSCRIPTION);
                });
            });
    }
}
