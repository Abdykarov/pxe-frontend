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
        const storedSupplyPointId = this.authService.currentUserValue.evaluatedSupplyPoint &&
            this.authService.currentUserValue.evaluatedSupplyPoint.toString();
        const actualSupplyPointId = state.root.queryParams.supplyPointId && state.root.queryParams.supplyPointId.toString();

        if (this.authService.currentUserValue.userStatus === UserStatus.AWAITING_VERIFICATION &&
            (R.indexOf(ROUTES.ROUTER_REQUEST_PAYMENT, state.url) < 0 || actualSupplyPointId !== storedSupplyPointId)
            ) {
                if (storedSupplyPointId) {
                    const extras = {
                        queryParams: {
                            supplyPointId: storedSupplyPointId,
                        },
                    };
                    this.router.navigate([ROUTES.ROUTER_REQUEST_PAYMENT], extras);
                } else {
                    this.router.navigate([CONSTS.PATHS.LOGOUT]);
                }
                return false;
        }

        return true;
    }
}
