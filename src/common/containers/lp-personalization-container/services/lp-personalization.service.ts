import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import * as R from 'ramda';

import { CookiesService } from 'src/app/services/cookies.service';
import { personalizationOptions } from 'src/common/containers/lp-personalization-container/lp-personalization-container.config';

@Injectable({
    providedIn: 'root',
})
export class LpPersonalizationService {
    private readonly COOKIE_KEY = 'personalization';

    constructor(
        private cookieService: CookiesService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}


    private getPersonalization = (): string => this.cookieService.get(this.COOKIE_KEY);

    private setPersonalization = (personalization: string): string => {
        this.cookieService.set(this.COOKIE_KEY, personalization, new Date().valueOf());
        return personalization;
    }

    public processPersonalization = (fragment: string): string => {
        const isFragmentWhichContainsPersonalization = R.find(
            R.propEq('fragment', fragment),
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
    }
}
