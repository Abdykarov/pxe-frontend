import {
    DOCUMENT,
    isPlatformBrowser,
} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { GTMService } from './services/gtm.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        private gtmService: GTMService,
        private router: Router,
        private sAnalyticsService: SAnalyticsService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.sAnalyticsService.init();
            this.sAnalyticsService.installSForm();
            this.sAnalyticsService.installSBiometrics();
            this.sAnalyticsService.initSBiometrics();
            this.sAnalyticsService.initSForm();
            this.sAnalyticsService.initSApm();

            if (!environment.gtmId) {
                return;
            }

            const script = this.document.createElement('script');
            script.async = true;
            // GTM
            script.src = 'https://www.googletagmanager.com/gtm.js?id=' + environment.gtmId;
            // GA
            // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaId;
            this.document.head.prepend(script);

            this.gtmService.init();

            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    gtmService.gtm(event);
                    // gaService.gtm(event);
                }
            });
        }
    }
}
