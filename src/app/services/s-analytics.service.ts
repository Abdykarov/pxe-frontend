import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { GTMService } from 'src/app/services/gtm.service';

import { environment } from 'src/environments/environment';

declare const sa;

@Injectable({
    providedIn: 'root',
})
export class SAnalyticsService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        // @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    public init = () => {
        sa('create', environment.sAnalyticsTId);
        sa('send', 'pageview');

        // sa('send', 'register', '8794FFFFF');
        //
        // const applicationWebData = {
        //     'applicationId': '8794FFFFF',
        //     'loanInfo': {
        //         'type': 'string',
        //         'amount': 0,
        //         'monthlyPayment': 0,
        //         'numberOfInstallments': 0,
        //     },
        // };
        // sa('send', 'webdata', applicationWebData);
    }

    public installPlugin = (pluginName) => {
        sa('include', pluginName);

        // const node = this.document.createElement('script');
        // node.src = dynamicScripts[i];
        // node.type = 'text/javascript';
        // node.async = false;
        // this.document.getElementsByTagName('head')[0].appendChild(node);
        //

        // System.import(`https://sa-sdp.lnd.bz/versions/stable/${pluginName}.plugin.min.js`);


        // (function(d, f, g, e, a, c, b)
        // {if (c = d.getElementById(g))
        // {for (b = 0; b < e.length; b++) {a = d.createElement(f),
        // a.async = 1, a.src = e[b], c.parentNode.insertBefore(a, c.nextSibling); } }
        // })(document, 'script', 'SAnalyticsScript', [
        //     'https://sa-sdp.lnd.bz/versions/stable/<pluginName1>.plugin.min.js',
        //     'https://sa-sdp.lnd.bz/versions/stable/<pluginName2>.plugin.min.js',
        // ]);
        // </script>;
    }
}
