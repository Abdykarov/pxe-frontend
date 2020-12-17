import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import * as moment from 'moment';

import { CookiesService } from 'src/app/services/cookies.service';

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
        this.cookieService.set(this.COOKIE_KEY, personalization, moment().add(1, 'month').valueOf());
        return personalization;
    }

    public processPersonalization = (fragment: string): string => {
        if (!fragment) {
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
