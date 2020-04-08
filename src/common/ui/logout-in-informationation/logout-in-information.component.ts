import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    interval
} from 'rxjs';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { CONSTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

@Component({
    selector: 'pxe-logout-in-information',
    templateUrl: './logout-in-information.html',
})
export class LogoutInInformationComponent extends AbstractComponent {
    public readonly SHOW_USER_WILL_BE_LOGOUT_INTERVAL_IN_SECONDS = CONSTS.SHOW_USER_WILL_BE_LOGOUT_INTERVAL_IN_SECONDS;

    public tokenWillExpireInSeconds = -1;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            interval(1000)
                .pipe(
                    takeUntil(this.destroy$),
                    filter( _ => this.router.url.includes('secured') && this.authService.isLastRefreshToken),
                )
                .subscribe(_ => {
                    this.tokenWillExpireInSeconds = Math.floor((this.authService.currentUserValue.exp * 1000 - new Date().getTime()) / 1000)
                    if(this.tokenWillExpireInSeconds === 0) {
                        this.authService.logoutForced();
                        this.authService.isLastRefreshToken = false;
                    }
                    this.cd.markForCheck();
                })
        }
    }}
