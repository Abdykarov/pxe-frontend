import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import * as moment from 'moment';
import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { dateDiff } from 'src/common/utils/supply-point-date-calculate.fnc';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {
    constructor(
        private authService: AuthService,
    ) {}

    resolve() {
        const currentUser = this.authService.currentUserValue;
        const expTime = new Date(currentUser.exp * 1000);
        const timeToTokenEnd = dateDiff(moment().toISOString(), expTime.toISOString(), 'ms');
        if (timeToTokenEnd <= CONSTS.REFRESH_INTERVAL_TOKEN) {
            return this.authService.refreshToken();
        }
        return of({});
    }
}
