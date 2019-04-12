import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

export enum SCROLL_TO {
    LANDING_SUBSCRIPTION,
}

@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    private scrollRegister = new Subject<SCROLL_TO>();

    getScrollStream() {
       return this.scrollRegister.asObservable();
    }

    activeScrollTo(scrollTo: SCROLL_TO) {
        this.scrollRegister.next(scrollTo);
    }
}
