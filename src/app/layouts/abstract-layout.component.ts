import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    OnInit,
} from '@angular/core';

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
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from './models/router-data.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

export abstract class AbstractLayoutComponent extends AbstractComponent implements OnInit {
    public isMenuOpen = false;
    public showOverlay = false;
    public toggleSubscription: Subscription;

    public settings: ISettings = {
        isPublic: false,
        isLandingPage: false,
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
        protected cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected scrollToService: ScrollToService,
    ) {
        super();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log('%c ***** NavigationEnd *****', 'background: #bada55; color: #000; font-weight: bold', this.showOverlay);
                if (this.showOverlay) {
                    this.toggleSubscription = this.overlayService.toggleOverlay(false)
                        .subscribe();
                    this.toggleSubscription.unsubscribe();
                }
                this.settings = <ISettings>this.route.snapshot.firstChild.data;
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
        if (this.settings.loginType === LoginType.NAVIGATE) {
            this.router.navigate([CONSTS.PATHS.LOGIN]);
        }
    }

    public homeRedirect = () => {
        if (!this.authService.isLogged()) {
            this.router.navigate([CONSTS.PATHS.EMPTY]);
        } else if (this.authService.currentUserValue.supplier) {
            this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER]);
        } else {
            this.router.navigate([ROUTES.ROUTER_DASHBOARD]);
        }
    }

    public toggleMenuOpen = (open: boolean) => {
        console.log('%c ***** toggle *****', 'background: #bada55; color: #000; font-weight: bold', open);
        this.isMenuOpen = open;
        this.overlayService.toggleOverlay(open)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
        this.cd.markForCheck();
    }
}
