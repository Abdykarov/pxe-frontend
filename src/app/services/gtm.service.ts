import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { PUSH_EVENTS_GA } from 'src/app/app.constants';

declare const gtag;

@Injectable({
    providedIn: 'root',
})
export class GTMService {

    public init = () => {
        (<any>window).dataLayer = (<any>window).dataLayer || [];
        (<any>window).dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    }

    public gtm = (event): void => {
        (<any>window).dataLayer.push({event: 'pageview', page_path: event.urlAfterRedirects});
    }

    public setUserId = (userId: string) => gtag('set', {'user_id': CryptoJS.SHA256(userId).toString()});

    public pushEvent = (action: string = null, category = PUSH_EVENTS_GA.CATEGORY) => {
        if ((<any>window).dataLayer) {
            (<any>window).dataLayer.push({
                event: PUSH_EVENTS_GA.EVENT,
                category,
                action,
            });
        }
    }
}
