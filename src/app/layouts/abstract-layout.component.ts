import {
    ActivatedRoute,
    NavigationEnd,
    NavigationExtras,
    Router,
} from '@angular/router';
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
import { CONSTS } from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from './models/router-data.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

export abstract class AbstractLayoutComponent extends AbstractComponent implements OnInit {
    public activeUrl: string;
    public isMenuOpen = false;
    public showOverlay = false;
    public toggleSubscription: Subscription;

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
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected scrollToService: ScrollToService,
    ) {
        super();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.showOverlay) {
                    this.toggleSubscription = this.overlayService.toggleOverlay(false)
                        .subscribe();
                    this.toggleSubscription.unsubscribe();
                }
                if (event.urlAfterRedirects.indexOf('/secured') >= -1) {
                    localStorage.setItem(CONSTS.LAST_URL, event.urlAfterRedirects);
                }
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

    public signUp = () => {
        if (this.settings.signUpType === SignType.SCROLL) {
            this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.LANDING_SUBSCRIPTION);
        } else if (this.settings.signUpType === SignType.NAVIGATE) {
            this.router.navigate([CONSTS.PATHS.SIGN_UP]);
        }
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
            this.router.navigate([CONSTS.PATHS.LOGIN], extras);
        }
    }

    public homeRedirect = () => {
        this.authService.homeRedirect();
    }

    public toggleMenuOpen = (open: boolean) => {
        this.isMenuOpen = open;
        this.overlayService.toggleOverlay(open)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}
