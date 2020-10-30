import { Injectable } from '@angular/core';

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

    public pushEvent = (category: string, action: string = null, label: string = null) => {
        (<any>window).dataLayer.push({
            'event': 'eventTracking',
            'category': 'event Category',
            'action': 'event Action',
            'label': 'event Label',
        });
    }
}
