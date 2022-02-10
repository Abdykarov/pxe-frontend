import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { Observable } from 'rxjs';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointDetailGuard implements CanActivateChild {
    constructor(private navigateConsumerService: NavigateConsumerService) {}

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
            this.navigateConsumerService.navigateToRequests();
            return false;
        }
        return true;
    }
}
