import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {
    constructor(
        private authService: AuthService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        const currentUser = this.authService.currentUserValue;
        const expTime = new Date(currentUser.exp * 1000);
        const timeToTokenEnd = dateDiff(moment().toISOString(), expTime.toISOString(), 'ms');
        if (timeToTokenEnd <= CONSTS.REFRESH_INTERVAL_TOKEN && timeToTokenEnd > 0) {
            return this.authService.refreshToken();
        }
        return null;
    }
}
