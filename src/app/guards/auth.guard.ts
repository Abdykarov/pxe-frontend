import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
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
    ) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;

        this.authService.checkLogin();

        if (!this.authService.isLogged()) {
            console.log('123123123_222');
            this.authService.logoutForced();
            return false;
        }

        if (!R.isNil(childRoute.data.isSupplier)) {
            console.log('123123123_222___ASDASDASDDSA');
            const currentUser = this.authService.currentUserValue;
            return currentUser && currentUser.supplier === childRoute.data.isSupplier;
        }

        return true;
    }
}
