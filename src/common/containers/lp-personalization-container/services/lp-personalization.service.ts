import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as R from 'ramda';
import { personalizationOptions } from 'src/common/containers/lp-personalization-container/lp-personalization-container.config';
import { CookiesService } from 'src/common/services/cookies.service';

@Injectable({
    providedIn: 'root',
})
export class LpPersonalizationService {
    private readonly COOKIE_KEY = 'personalization';

    constructor(
        private cookieService: CookiesService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    private getPersonalization = (): string =>
        this.cookieService.get(this.COOKIE_KEY);

    private setPersonalization = (personalization: string): string => {
        const today = new Date();
        const newMonth = new Date(
            today.setMonth(today.getMonth() + 1)
        ).getTime();
        this.cookieService.set(this.COOKIE_KEY, personalization, newMonth);
        return personalization;
    };

    public processPersonalization = (fragment: string): string => {
        const isFragmentWhichContainsPersonalization = R.find(
            R.propEq('fragment', fragment)
        )(personalizationOptions);

        if (!fragment || !isFragmentWhichContainsPersonalization) {
            const personalizationInCookie = this.getPersonalization();
            if (!!personalizationInCookie) {
                return personalizationInCookie;
            } else {
                return this.setPersonalization(personalizationInCookie);
            }
        }
        return this.setPersonalization(fragment);
    };
}
