import { isPlatformBrowser } from '@angular/common';
import { CONSTS } from 'src/app/app.constants';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import { CookiesService } from 'src/app/services/cookies.service';
import { inArray } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class OnlyOneTabActiveService {
    public readonly uuid: string;

    constructor(
        private cookieService: CookiesService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        this.uuid = this.generateUuid();
    }

    generateUuid = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    isThisTabActive = (uuid: string = '_'): boolean =>
        inArray(this.cookieService.get(CONSTS.ONLY_ONE_TAB_ACTIVE.NAME_COOKIE), [this.uuid, uuid])

    setActiveTab = (value: string = null): void => {
        if (isPlatformBrowser(this.platformId)) {
            const newValue = value ? value : this.uuid;
            this.cookieService.set(CONSTS.ONLY_ONE_TAB_ACTIVE.NAME_COOKIE, newValue, 0);
            localStorage.setItem(CONSTS.ONLY_ONE_TAB_ACTIVE.NAME_COOKIE, newValue);
        }
    }
}
