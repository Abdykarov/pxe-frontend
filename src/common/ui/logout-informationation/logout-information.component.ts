import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
// own classes
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/common/services/auth.service';
import { OnlyOneTabActiveService } from 'src/common/services/only-one-tab-active.service';

@Component({
    selector: 'pxe-logout-information',
    templateUrl: './logout-information.component.html',
})
export class LogoutInformationComponent extends AbstractComponent {
    public readonly TIME_TO_SHOW_USER_LOGOUT_BANNER =
        CONSTS.TIME_TO_SHOW_USER_LOGOUT_BANNER;

    public tokenWillExpireInSeconds = -1;

    constructor(
        public authService: AuthService,
        private cd: ChangeDetectorRef,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            interval(1000)
                .pipe(
                    takeUntil(this.destroy$),
                    filter(
                        (_) =>
                            this.router.url.includes('secured') &&
                            this.authService.isLastRefreshToken &&
                            this.onlyOneTabActiveService.isThisTabActive()
                    )
                )
                .subscribe((_) => {
                    this.tokenWillExpireInSeconds = Math.floor(
                        (this.authService.currentUserValue.exp * 1000 -
                            new Date().getTime()) /
                            1000
                    );
                    if (this.tokenWillExpireInSeconds === 0) {
                        this.authService.logoutForced();
                        this.authService.isLastRefreshToken = false;
                    }
                    this.cd.markForCheck();
                });
        }
    }
}
