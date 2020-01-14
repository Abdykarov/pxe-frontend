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
        sa('send', 'register', '8794FFFFF');

        const applicationWebData = {
            'applicationId': '8794FFFFF',
            'loanInfo': {
                'type': 'string',
                'amount': 0,
                'monthlyPayment': 0,
                'numberOfInstallments': 0,
            },
        };
        sa('send', 'webdata', applicationWebData);
    }
}
