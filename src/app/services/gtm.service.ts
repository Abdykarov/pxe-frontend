import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { CONSTS, GTM_CONSTS } from '../app.constants';
import { environment } from 'src/environments/environment';
import { ScriptService } from 'src/app/services/external-resources.service';
import { ExternalResourceType } from 'src/app/services/model/widget.model';

import * as R from 'ramda';
import { DOCUMENT } from '@angular/common';

declare const gtag;

@Injectable({
    providedIn: 'root',
})
export class GTMService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(LOCALE_ID) private locale: string,
        private scriptService: ScriptService,
    ) {}

    public init = () => {
        (<any>window).dataLayer = (<any>window).dataLayer || [];
        // (<any>window).dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

        // gtag('consent', 'default', {
        //     ad_storage: 'denied',
        //     analytics_storage: 'denied',
        //     wait_for_update: 2000,
        // });
        gtag('js', new Date());
        // (<any>window).dataLayer.push({
        //     'gtm.start': new Date().getTime(),
        //     event: 'gtm.js',
        // });
        // gtag('config', environment.gtmId);

        // setTimeout(() => {
            const script = this.document.createElement('script');
            script.async = true;
            // GTM
            script.src = 'https://www.googletagmanager.com/gtm.js?id=' + environment.gtmId;
            // GA
            // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaId;
            this.document.body.append(script);
        // }, 2000);

        (<any>(
            window
        )).ccnstL = `/${CONSTS.PATHS.COOKIES_POLICY}`;
        (<any>window).ccnstS = '/ccstyles.min.css';
        (<any>window).ccnstLang = R.pipe(
            R.split('-'),
            R.head,
        )(this.locale);

        this.scriptService.loadStatic(
            ExternalResourceType.styles,
            'ccstyles',
        );
        this.scriptService.loadStatic(
            ExternalResourceType.scripts,
            'ccbundle',
            'body',
        );
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
