import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import {
    Observable,
    of,
} from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {

    constructor(
        private authService: AuthService,
    ) {}

    private needRefreshToken = () => !this.authService.startExpirationOfToken || dateDiff(
        this.authService.startExpirationOfToken.toISOString(),
        new Date().toISOString(),
        'minutes',
    ) >= CONSTS.REFRESH_TOKEN_DONT_REFRESH_TIME_IN_MINUTES

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        this.authService.startRefreshTokenInterval();
        if (this.authService.dontRefreshToken) {
            this.authService.dontRefreshToken = false;
            return of({});
        } else {
            if (this.needRefreshToken()) {
                this.authService.startExpirationOfToken = new Date();
                return this.authService.refreshToken()
                    .pipe(
                        catchError(() => of()),
                    );
            } else {
                return of({});
            }
        }
    }
}
