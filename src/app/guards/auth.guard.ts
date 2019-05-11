import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';

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

        if (!this.authService.isLogged()) {
            this.router.navigate([CONSTS.PATHS.EMPTY]);
            return false;
        }

        if (childRoute.data.isSupplier !== undefined) {
            return this.authService.isSupplier() === childRoute.data.isSupplier;
        }

        return true;
    }
}
