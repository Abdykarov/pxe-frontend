import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

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

        // if (this.authService.currentUserValue.userStatus === UserStatus.AWAITING_VERIFICATION &&
        //     R.indexOf(ROUTES.ROUTER_REQUEST_PAYMENT, state.url) < 0) {
        //         const supplyPointId = this.authService.getSupplyPointIdWaitingForPayment();
        //         if (supplyPointId) {
        //             const extras = {
        //                 queryParams: {
        //                     supplyPointId: supplyPointId,
        //                 },
        //             };
        //             this.router.navigate([ROUTES.ROUTER_REQUEST_PAYMENT], extras);
        //         } else {
        //             this.router.navigate([CONSTS.PATHS.LOGOUT]);
        //         }
        //         return false;
        // }

        return true;
    }
}
