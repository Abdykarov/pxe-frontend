import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {
    constructor(private authService: AuthService) {}

    private needRefreshToken = () =>
        !this.authService.startExpirationOfToken ||
        dateDiff(
            this.authService.startExpirationOfToken.toISOString(),
            new Date().toISOString(),
            'minutes'
        ) >= CONSTS.REFRESH_TOKEN.DONT_REFRESH_TIME_IN_MINUTES;

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | any {
        if (!this.authService.wasRefreshCallRefreshInterval) {
            this.authService.dontRefreshToken = false;
            this.authService.wasRefreshCallRefreshInterval = true;
            return this.authService.refreshTokenInterval();
        } else if (this.authService.dontRefreshToken) {
            this.authService.dontRefreshToken = false;
            this.authService.wasRefreshCallRefreshInterval = true;
        } else if (this.needRefreshToken()) {
            this.authService.isLastRefreshToken = false;
            return this.authService.refreshTokenInterval();
        }
        return of({});
    }
}
