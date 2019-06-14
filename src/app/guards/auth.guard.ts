import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import * as R from 'ramda';

import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';

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
        this.authService.checkLogin();

        if (!this.authService.isLogged()) {
            this.router.navigate([CONSTS.PATHS.EMPTY]);
            return false;
        }

        if (!R.isNil(childRoute.data.isSupplier)) {
            const currentUser = this.authService.currentUserValue;
            return currentUser && currentUser.supplier === childRoute.data.isSupplier;
        }

        return true;
    }
}
