import {
    ActivatedRoute,
    NavigationEnd,
    NavigationExtras,
    Router,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { OnInit } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import {
    fromEvent,
    Subscription,
} from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { inArray } from 'src/common/utils';
import {
    ISettings,
    LoginType,
    SignType,
} from './models/router-data.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

export abstract class AbstractLayoutComponent extends AbstractComponent implements OnInit {
    public activeUrl: string;
    public isMenuOpen = false;
    public showOverlay = false;
    public toggleSubscription: Subscription;
    public isLogouting = false;

    public settings: ISettings = {
        isPublic: false,
        isLandingPage: false,
        isPublicEmptyPage: false,
        isSimpleFooter: false,
        isStatic: false,
        loginType: LoginType.NONE,
        hideLeftNavigation: false,
        signUpType: SignType.NONE,
    };

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    protected constructor(
        protected apollo: Apollo,
        protected authService: AuthService,
        protected cookieService: CookiesService,
        protected overlayService: OverlayService,
        protected platformId: string,
        protected route: ActivatedRoute,
        protected router: Router,
        protected sAnalyticsService: SAnalyticsService,
        public scrollToService: ScrollToService,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.isLogouting = event.urlAfterRedirects.indexOf(`/${this.CONSTS.PATHS.LOGOUT}`) !== -1;

                    if (
                        event && event.urlAfterRedirects &&
                        !inArray(event.urlAfterRedirects, [`/${this.CONSTS.PATHS.LOGIN}`, `/${this.CONSTS.PATHS.LOGOUT}`])
                    ) {
                        this.cookieService.remove(this.CONSTS.STORAGE_HELPERS.REASON_FOR_LOGOUT_USER);
                    }

                    if (this.showOverlay) {
                        this.toggleSubscription = this.overlayService.toggleOverlay(false)
                            .subscribe();
                        this.toggleSubscription.unsubscribe();
                    }
                    if (
                        event.urlAfterRedirects.indexOf(`/${this.CONSTS.PATHS.SECURED}`) !== -1 &&
                        isPlatformBrowser(this.platformId)
                    ) {
                        localStorage.setItem(this.CONSTS.STORAGE_HELPERS.LAST_URL, event.urlAfterRedirects);
                    }

                    if (event && event.url.indexOf(`/${this.CONSTS.PATHS.SECURED}`) === -1) {
                        this.authService.setActualStateFromOtherTab();
                    }

                    this.sAnalyticsService.pageView();
                    this.settings = <ISettings>this.route.snapshot.firstChild.data;
                    this.activeUrl = this.router.url;
                }
            });
    }

    ngOnInit() {
        this.resizeEvent$.subscribe(() => {
            if (this.isMenuOpen) {
                this.toggleMenuOpen(false);
            }
        });
    }

    public login = () => {
        if (R.indexOf(this.settings.loginType, [LoginType.RELOAD, LoginType.NAVIGATE]) >= 0) {
            let extras: NavigationExtras = {};
            if (this.settings.loginType === LoginType.RELOAD) {
                extras = {
                    queryParams: {
                        reset: new Date().getTime(),
                    },
                    skipLocationChange: true,
                };
            }
            this.router.navigate([this.CONSTS.PATHS.LOGIN], extras);
        }
    }

    public homeRedirect = (param = false) => this.authService.homeRedirect(param);

    public landingPageRedirect = () => this.router.navigate([this.CONSTS.PATHS.EMPTY]);

    public toggleMenuOpen = (open: boolean) => {
        this.isMenuOpen = open;
        this.overlayService.toggleOverlay(open)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    public signUp = () => this.router.navigate([this.CONSTS.PATHS.SIGN_UP]);
}
