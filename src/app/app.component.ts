import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/common/services/auth.service';
import { GTMService } from 'src/common/services/gtm.service';
import { OnlyOneTabActiveState } from 'src/common/services/model/only-one-tab-active.model';
import { OnlyOneTabActiveService } from 'src/common/services/only-one-tab-active.service';
import { SAnalyticsService } from 'src/common/services/s-analytics.service';
import { environment } from 'src/environments/environment';

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
        @Inject(PLATFORM_ID) private platformId: string
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
                    onlyOneTabActiveService.setActiveTab(
                        OnlyOneTabActiveState.CLOSED
                    );
                }
            });

            if (!environment.gtmId) {
                return;
            }

            this.gtmService.init();

            this.router.events
                .pipe(takeUntil(this.destroy$))
                .subscribe((event) => {
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
