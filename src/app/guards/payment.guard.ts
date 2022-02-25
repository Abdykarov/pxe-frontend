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
import { ROUTES } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { UserStatus } from 'src/app/services/model/auth.model';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

/**
 * If any acount waits for payment its block on payment view.
 */
@Injectable({
    providedIn: 'root',
})
export class PaymentGuard implements CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router,
        private navigateConsumerService: NavigateConsumerService
    ) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        this.authService.checkLogin();
        const storedSupplyPointId =
            this.authService.currentUserValue?.evaluatedSupplyPoint?.toString();
        const actualSupplyPointId =
            state.root.queryParams?.supplyPointId?.toString();

        const isInPaymentState =
            this.authService.currentUserValue?.userStatus ===
            UserStatus.AWAITING_VERIFICATION;
        if (
            isInPaymentState &&
            (R.indexOf(ROUTES.ROUTER_REQUEST_PAYMENT, state.url) < 0 ||
                actualSupplyPointId !== storedSupplyPointId)
        ) {
            if (storedSupplyPointId) {
                const queryParams = {
                    supplyPointId: storedSupplyPointId,
                };
                this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                    ProgressStatus.WAITING_FOR_PAYMENT,
                    queryParams
                );
            } else {
                this.authService.logoutForced();
            }
            return false;
        }

        return true;
    }
}
