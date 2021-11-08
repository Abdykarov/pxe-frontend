import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointDetailGuard implements CanActivateChild {
    constructor(private router: Router) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const isNotSupplyPoint = R.pathSatisfies(
            R_.isNilOrEmpty,
            ['queryParams', 'supplyPointId'],
            childRoute
        );
        if (isNotSupplyPoint) {
            this.router.navigate([ROUTES.ROUTER_REQUESTS]);
            return false;
        }
        return true;
    }
}
