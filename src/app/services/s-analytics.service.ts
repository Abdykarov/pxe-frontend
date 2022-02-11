import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as R from 'ramda';
import { SAnalyticsPlugins } from 'src/app/services/model/s-analytics.model';
import { environment } from 'src/environments/environment';

declare const sa;

@Injectable({
    providedIn: 'root',
})
export class SAnalyticsService {
    private UUID: string = null;

    private installedSApm = false;
    private installedSForm = false;
    private installedSBio = false;
    private installed = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    private canUseSAnalytics = () =>
        isPlatformBrowser(this.platformId) && environment.sAnalyticsTId;

    public init = () => {
        if (!this.canUseSAnalytics() || this.installed) {
            return;
        }

        this.downloadSAnalytics();
        sa('create', environment.sAnalyticsTId);
        this.registrationApplication();
        this.pageView();
        this.installed = true;
    };

    public registrationApplication = () => {
        return;
        // if (!this.canUseSAnalytics()) {
        //     return;
        // }
        //
        // this.UUID = uuid();
        // sa('send', 'register', '0' + this.UUID + '0');
    };

    public sendWebData = (
        loanInfo = {},
        borrower = {},
        coborrower = {},
        webdata = {}
    ) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        const userInfo = sa('get', 'userInfo');

        if (R.isNil(userInfo)) {
            return;
        }
        const applicationWebData = {
            tid: environment.sAnalyticsTId,
            applicationId: userInfo.said,
            sa: userInfo.sa,
            said: userInfo.said,
            clientTimestamp: new Date().getTime(),
            loanInfo,
            borrower,
            coborrower,
            webdata,
        };

        sa('send', 'webdata', applicationWebData);
        this.registrationApplication();
    };

    private installPlugin = (sAnalyticsPlugins: SAnalyticsPlugins) => {
        const script = this.document.createElement('script');
        script.async = true;
        script.src = `https://sa-sdp.lnd.bz/versions/stable/${sAnalyticsPlugins}.plugin.min.js`;
        this.document.head.prepend(script);
    };

    public initSApm = () => {
        if (!this.canUseSAnalytics() || this.installedSApm) {
            return;
        }

        sa('include', SAnalyticsPlugins.sApm);
        this.installPlugin(SAnalyticsPlugins.sApm);
        this.installedSApm = true;
    };

    public installSForm = () => {
        if (!this.canUseSAnalytics() || this.installedSForm) {
            return;
        }

        this.installPlugin(SAnalyticsPlugins.sForm);
        this.installedSForm = true;
    };

    public installSBiometrics = () => {
        if (!this.canUseSAnalytics() || this.installedSBio) {
            return;
        }

        this.installPlugin(SAnalyticsPlugins.sBiometrics);
        this.installedSBio = true;
    };

    public initSBiometrics = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('include', 's-biometrics');
    };

    public initSForm = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('include', 's-form');
    };

    public sFormStart = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:start');
    };

    public sFormEnd = () => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:end');
    };

    public sFormBlur = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }
        sa('s-form:blur', { event });
    };

    public sFormChange = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:change', { event });
    };

    public sFormClick = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:click', { event });
    };

    public sFormSubmit = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:submit', { event });
    };

    public sFormFocus = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-form:focus', { event });
    };

    public sBioFocus = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-biometrics:focus', { event });
    };

    public sBioKeyDown = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-biometrics:keydown', { event });
    };

    public sBioKeyUp = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-biometrics:keyup', { event });
    };

    public sBioBlur = (event) => {
        if (!this.canUseSAnalytics()) {
            return;
        }

        sa('s-biometrics:blur', { event });
    };

    public pageView = () => {
        if (!this.canUseSAnalytics() || this.installed) {
            return;
        }

        sa('send', 'pageview');
    };

    private downloadSAnalytics = () => {
        const script = this.document.createElement('script');
        script.async = true;
        script.text = `(function(i, s, o, g, r, a, m) {i['SAnalyticsObject'] = r; i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments); }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; a.id = 'SAnalyticsScript'; m.parentNode.insertBefore(a, m);
            })(window, document, 'script', 'https://sa-sdp.lnd.bz/versions/stable/s-analytics.min.js', 'sa');`;
        this.document.head.prepend(script);
    };
}
