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
import { CONSTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        this.authService.checkLogin();

        if (!this.authService.isLogged()) {
            this.router.navigate([CONSTS.PATHS.LOGIN], {
                state: {
                    urlToRedirectAfterLogin: state.url,
                },
            });
            return false;
        }

        /**
         * In parc4u there are 3 types of secured views.
         * 1. Consumer
         * 2. Supplier
         * 3. Admin
         * This block check if user is allowed to access to section.
         */
        if (!R.isNil(childRoute.data.userType)) {
            const routerUserType = childRoute.data.userType;
            const currentUserType = this.authService.currentUserValue.type;
            const isAllowedType = routerUserType === currentUserType;
            if (!isAllowedType) {
                this.authService.homeRedirect();
                return false;
            }
        }

        return true;
    }
}
