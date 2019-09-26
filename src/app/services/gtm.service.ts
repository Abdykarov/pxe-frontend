import { Injectable } from '@angular/core';

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
}
