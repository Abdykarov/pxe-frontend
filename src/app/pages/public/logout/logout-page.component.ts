import {Apollo} from 'apollo-angular';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


import { first } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApolloService } from 'src/app/services/apollo.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { CONSTS } from 'src/app/app.constants';
import { defaultState } from 'src/app/pages/public/logout/logout-page.config';
import { IStateRouter } from 'src/app/pages/public/logout/logout-page.model';

@Component({
    templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent extends AbstractComponent implements OnInit {
    public error = false;
    public state: IStateRouter = defaultState;
    public visible = false;

    constructor(
        private apollo: Apollo,
        private apolloService: ApolloService,
        private authService: AuthService,
        private cookieService: CookiesService,
        private cd: ChangeDetectorRef,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.state = window.history.state;
        }
    }

    ngOnInit() {
        this.logout();
    }

    public logout = () => {
        this.authService.logout()
            .pipe(first())
            .subscribe(
                () => {
                    this.authService.isLastRefreshToken = false;
                    this.apolloService.resetStore().then(() => {
                        const reasonForLogoutUserValue = this.state.isFromUnauthorized ?
                            CONSTS.REASON_FOR_LOGOUT_USER.UNAUTHORIZED : CONSTS.REASON_FOR_LOGOUT_USER.BY_SELF;
                        const reasonForLogoutUserTime = new Date().getTime() + CONSTS.COOKIE_TEMPORARY_EXPIRATION;

                        this.cookieService.set(
                            CONSTS.STORAGE_HELPERS.REASON_FOR_LOGOUT_USER,
                            reasonForLogoutUserValue,
                            reasonForLogoutUserTime,
                        );

                        this.router.navigate(
                            [CONSTS.PATHS.LOGIN],
                        )
                        .then(() => {
                            if (this.state.refresh) {
                                window.location.reload();
                            }
                        });
                    });
                },
                () => {
                    this.error = true;
                    this.cd.markForCheck();
                });
    }

    public reload = ($event) => {
        $event.preventDefault();
        this.error = false;
        this.logout();
    }
}
