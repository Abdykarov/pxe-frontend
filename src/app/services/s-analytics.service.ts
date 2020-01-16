import { DOCUMENT } from '@angular/common';
import {
    Inject,
    Injectable,
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
    ) {}

    public init = () => {
        this.downloadSAnalytics();
        sa('create', environment.sAnalyticsTId);
        this.registrationApplication();
        sa('send', 'pageview');
    }

    public registrationApplication = () => {
        this.UUID = uuid();
        sa('send', 'register', 'deadbeef-dead-dead-dead' + this.UUID);
    }

    public sendWebData = (
        loanInfo = {},
        borrower = {},
        coborrower = {},
        webdata = {},
    ) => {
        const applicationWebData = {
            tid: environment.sAnalyticsTId,
            applicationId: 'deadbeef-dead-dead-dead' + this.UUID,
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

    public initSApm = () =>
        this.installPlugin(SAnalyticsPlugins.sApm)

    public initSBiometrics = (formName, selectors = 'input[type=text], textarea') => {
        this.installPlugin(SAnalyticsPlugins.sBiometrics);
        sa('include', 's-biometrics', { formName: formName });
        sa('s-biometrics:track', {
            fields: selectors,
        });
    }

    public initSForm = (formName, selectors = 'input[type=text], textarea, button') => {
        this.installPlugin(SAnalyticsPlugins.sForm);
        sa('include', 's-form', formName ? {formName: formName} : null);
        sa('s-form:track');
        sa('s-form:start');
    }

    public unTractSBiometrics = () => sa('s-biometrics:untrack');

    public unTractSForm = () => {
        sa('s-form:end');
        sa('s-form:untrack');
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
