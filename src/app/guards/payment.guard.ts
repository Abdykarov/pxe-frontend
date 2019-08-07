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
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
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
        console.log('%c ***** USER *****', 'background: #bada00; color: #000; font-weight: bold', this.authService.currentUserValue);

        if (this.authService.currentUserValue.userStatus === UserStatus.AWAITING_VERIFICATION &&
            R.indexOf(ROUTES.ROUTER_REQUEST_PAYMENT, state.url) < 0) {
                const supplyPointId = this.authService.getSupplyPointIdWaitingForPayment();
                if (supplyPointId) {
                    const extras = {
                        queryParams: {
                            supplyPointId: supplyPointId,
                        },
                    };
                    this.router.navigate([ROUTES.ROUTER_REQUEST_PAYMENT], extras);
                } else {
                    console.log('%c ***** LOGOUT *****', 'background: #bada55; color: #000; font-weight: bold');
                    // this.router.navigate([CONSTS.PATHS.LOGOUT]);
                }
                return false;
        }

        return true;
    }
}
