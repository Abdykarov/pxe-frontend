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
        this.authService.checkUuid();

        if (!this.authService.isLogged()) {
            this.authService.logoutForced();
            return false;
        }

        if (!R.isNil(childRoute.data.isSupplier)) {
            const currentUser = this.authService.currentUserValue;
            return currentUser && currentUser.supplier === childRoute.data.isSupplier;
        }

        return true;
    }
}
