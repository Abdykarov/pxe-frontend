import { Injectable } from '@angular/core';

import {GTM_CONSTS} from '../app.constants';

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

    public setUserId = (userId: string) => gtag('set', {'user_id': userId});

    public pushEvent = (message) => (<any>window).dataLayer.push(message);

    public loadFormEvent = (label: string, userID: string) => this.pushEvent({
        event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
        category: GTM_CONSTS.CATEGORIES.FORM,
        action: GTM_CONSTS.ACTIONS.VIEW,
        label,
        userID,
    })

}
