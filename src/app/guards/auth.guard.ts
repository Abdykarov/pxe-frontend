import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { IUserTypes } from '../services/model/auth.model';

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
        this.authService.checkLogin();

        if (!this.authService.isLogged()) {
            this.authService.logoutForced();
            return false;
        }

        const routerUserType = childRoute.data;
        const currentUserType = this.authService.currentUserValue.type;
        return false;
    }
}
