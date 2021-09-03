import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    PLATFORM_ID,
    ElementRef,
    OnInit,
} from '@angular/core';
import {
    DOCUMENT,
    isPlatformBrowser,
} from '@angular/common';
import { Meta } from '@angular/platform-browser';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { GTMService } from './services/gtm.service';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
import { OnlyOneTabActiveState } from 'src/app/services/model/only-one-tab-active.model';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Component({
    selector: 'lnd-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends AbstractComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private elementRef: ElementRef,
        private gtmService: GTMService,
        private metaService: Meta,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        private router: Router,
        private sAnalyticsService: SAnalyticsService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();

        if (isPlatformBrowser(this.platformId)) {
            this.sAnalyticsService.init();
            this.sAnalyticsService.installSForm();
            this.sAnalyticsService.installSBiometrics();
            this.sAnalyticsService.initSBiometrics();
            this.sAnalyticsService.initSForm();
            this.sAnalyticsService.initSApm();

            window.addEventListener('beforeunload', (e) => {
                if (onlyOneTabActiveService.isThisTabActive()) {
                    onlyOneTabActiveService.setActiveTab(OnlyOneTabActiveState.CLOSED);
                }
            });

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

            this.router.events
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        gtmService.gtm(event);
                        // gaService.gtm(event);
                    }
                });
        }
    }

    ngOnInit(): void {
        if (environment.production) {
            this.elementRef.nativeElement.removeAttribute('ng-version');
        }
    }
}
