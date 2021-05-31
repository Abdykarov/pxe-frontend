import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Subject } from 'rxjs';

import {
    IScrollSetting,
    SCROLL_TO,
} from './model/scroll-to.model';
import { scrollSettings } from 'src/app/pages/public/landing/landing.config';

@Injectable({
    providedIn: 'root',
})
export class ScrollToService {
    private scrollRegister = new Subject<SCROLL_TO>();

    public getScrollStream = () => this.scrollRegister.asObservable();

    public activeScrollTo = (scrollTo: SCROLL_TO) => {
        this.scrollRegister.next(scrollTo);
    }

    public scrollToBlog = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.BLOG));

    public scrollToHelp = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.HELP));

    public scrollToHowItsWorks = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.HOW_IT_WORKS));

    public scrollToBestPricesInTheWorld = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.BEST_PRICES_IN_THE_WORLD));

    public scrollToFaq = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.FAQ));

    public scrollToHowItWorks = () => setTimeout(_ => this.activeScrollTo(SCROLL_TO.HOW_IT_WORKS));

    public getFragmentFromScrollTo = (scrollTo: SCROLL_TO) => R.pipe(
        R.find(
            (scrollSetting: IScrollSetting) => scrollSetting.scrollTo === scrollTo,
        ),
        R.prop('fragment'),
    )(scrollSettings)

    public getScrollToFromFragment = (fragment: string) => R.pipe(
        R.find(
            (scrollSetting: IScrollSetting) => scrollSetting.fragment === fragment,
        ),
        R.prop('scrollTo'),
    )(scrollSettings)
}
