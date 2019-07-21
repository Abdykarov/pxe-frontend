import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import * as R from 'ramda';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ROUTES } from 'src/app/app.constants';
import { UserStatus } from 'src/app/services/model/auth.model';

@Injectable({
    providedIn: 'root',
})
export class PaymentGuard implements CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.checkLogin();

        if (this.authService.currentUserValue.userStatus === UserStatus.WAITING_FOR_PAYMENT &&
            R.indexOf(ROUTES.ROUTER_REQUEST_PAYMENT, state.url) < 0) {
                const extras = {
                    queryParams: {
                        supplyPointId: this.authService.getSupplyPointIdWaitingForPayment(),
                    },
                };
                this.router.navigate([ROUTES.ROUTER_REQUEST_PAYMENT], extras);
                return false;
        }

        return true;
    }
}
