import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from '../app.constants';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
        this.authService.checkLogin();

        if (!this.authService.isLogged()) {
            this.router.navigate([CONSTS.PATHS.LOGIN], {
                state: {
                    urlToRedirectAfterLogin: state.url,
                },
            });
            return false;
        }

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
