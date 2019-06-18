import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';

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
import {
    ISettings,
    LoginType,
    SignType,
} from './models/router-data.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import {
    CONSTS,
    ROUTES,
} from '../app.constants';
import { ScrollToService } from '../services/scroll-to.service';
import { AuthService } from '../services/auth.service';

export abstract class AbstractLayoutComponent extends AbstractComponent {
    public showOverlay = false;
    public toggleSubscription: Subscription;

    public settings: ISettings = {
        isPublic: false,
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
                this.settings = <ISettings>this.route.snapshot.firstChild.data;
            }
        });
    }

    public signUp = () => {
        if (this.settings.signUpType === SignType.SCROLL) {
            this.scrollToService.scrollToSubscription();
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
}
