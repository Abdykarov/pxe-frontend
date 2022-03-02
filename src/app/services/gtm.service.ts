import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import * as R from 'ramda';
import { ScriptService } from 'src/app/services/external-resources.service';
import { ExternalResourceType } from 'src/app/services/model/widget.model';
import { environment } from 'src/environments/environment';
import { BUILD_ID_PROVIDER, CONSTS, GTM_CONSTS } from '../app.constants';

declare const gtag;

@Injectable({
    providedIn: 'root',
})
export class GTMService {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(LOCALE_ID) private locale: string,
        @Inject(BUILD_ID_PROVIDER) public buildId: string,
        private scriptService: ScriptService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    public init = () => {
        if (isPlatformBrowser(this.platformId)) {
            (<any>window).dataLayer = (<any>window).dataLayer || [];
            (<any>window).dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });

            const script = this.document.createElement('script');
            script.async = true;
            // GTM
            script.src =
                'https://www.googletagmanager.com/gtm.js?id=' +
                environment.gtmId;
            // GA
            // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaId;
            this.document.head.append(script);

            (<any>window).dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });
            gtag('config', environment.gtmId);

            (<any>window).ccnstL = `/${CONSTS.PATHS.COOKIES_POLICY}`;
            (<any>window).ccnstS = `/ccstyles.min.css?v=${this.buildId}`;
            (<any>window).ccnstLang = R.pipe(R.split('-'), R.head)(this.locale);

            this.scriptService.loadStatic(
                ExternalResourceType.styles,
                'ccstyles'
            );
            this.scriptService.loadStatic(
                ExternalResourceType.scripts,
                'ccbundle'
            );
        }
    };

    public gtm = (event): void => {
        if (isPlatformBrowser(this.platformId)) {
            (<any>window).dataLayer.push({
                event: 'pageview',
                page_path: event.urlAfterRedirects,
            });
        }
    };

    public setUserId = (userId: string) => {
        if (isPlatformBrowser(this.platformId)) {
            gtag('set', { user_id: userId });
        }
    };

    public pushEvent = (message) => (<any>window).dataLayer.push(message);

    public loadFormEvent = (label: string, userID: string) =>
        this.pushEvent({
            event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
            category: GTM_CONSTS.CATEGORIES.FORM,
            action: GTM_CONSTS.ACTIONS.VIEW,
            label,
            userID,
        });
}
