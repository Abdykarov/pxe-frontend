import {
    DOCUMENT,
    isPlatformBrowser,
} from '@angular/common';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { SAnalyticsPlugins } from 'src/app/services/model/s-analytics.model';

import * as uuid from 'uuid/v4';

import { environment } from 'src/environments/environment';

declare const sa;

@Injectable({
    providedIn: 'root',
})
export class SAnalyticsService {

    private UUID: string = null;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    private canUseSAnalytics = () => isPlatformBrowser(this.platformId) && environment.sAnalyticsTId;

    public init = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        this.downloadSAnalytics();
        sa('create', environment.sAnalyticsTId);
        this.registrationApplication();
        sa('send', 'pageview');
    }

    public registrationApplication = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        this.UUID = uuid();
        sa('send', 'register', 'deadbeef-dead-dead-dead' + this.UUID);
    }

    public sendWebData = (
        loanInfo = {},
        borrower = {},
        coborrower = {},
        webdata = {},
    ) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        const applicationWebData = {
            tid: environment.sAnalyticsTId,
            applicationId: '0' + this.UUID + '0',
            sa: 'I DONT KNOW WHAT I AM',
            said: 'I DONT KNOW WHAT I AM',
            clientTimestamp: new Date().getTime(),
            'loanInfo': {},
            borrower,
            coborrower,
            webdata,
        };
        sa('send', 'webdata', applicationWebData);
        this.registrationApplication();
    }

    private installPlugin = (sAnalyticsPlugins: SAnalyticsPlugins) => {
        sa('include', sAnalyticsPlugins);
        const script = this.document.createElement('script');
        script.async = true;
        script.src = `https://sa-sdp.lnd.bz/versions/stable/${sAnalyticsPlugins}.plugin.min.js`;
        this.document.head.prepend(script);
    }

    public initSApm = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        this.installPlugin(SAnalyticsPlugins.sApm);
    }

    public installSForm  = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        this.installPlugin(SAnalyticsPlugins.sForm);
    }

    public installSBiometrics = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        this.installPlugin(SAnalyticsPlugins.sBiometrics);
    }

    public initSBiometrics = (formName = null, selectors = 'input[type=text], textarea') => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('include', 's-biometrics', formName ? {formName: formName} : null);
        sa('s-biometrics:track', {
            fields: selectors,
        });
    }

    public initSForm = (formName = null, selectors = 'input, textarea, button') => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('include', 's-form', formName ? {formName: formName} : null);
        sa('s-form:track');
        sa('s-form:start');
    }

    public unTractSBiometrics = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-biometrics:untrack');
    }

    public unTractSForm = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:end');
        sa('s-form:untrack');
    }

    public sFormBlur = ($event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:blur', { $event });
    }

    public sFormChange = ($event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:change', { $event });
    }

    public sFormFocus = ($event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:focus', { $event });
    }

    private downloadSAnalytics = () => {
        const script = this.document.createElement('script');
        script.async = true;
        script.text = `(function(i, s, o, g, r, a, m) {i['SAnalyticsObject'] = r; i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments); }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; a.id = 'SAnalyticsScript'; m.parentNode.insertBefore(a, m);
            })(window, document, 'script', 'https://sa-sdp.lnd.bz/versions/stable/s-analytics.min.js', 'sa');`;
        this.document.head.prepend(script);
    }
}
