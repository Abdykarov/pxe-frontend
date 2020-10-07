import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CookiePolicyService } from 'src/common/cms/services/cookie-policy.service';

@Injectable({
    providedIn: 'root',
})
export class CookiePolicyResolver implements Resolve<any> {

    constructor(
        private cookiePolicyService: CookiePolicyService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.cookiePolicyService.getCookiePolicy();
    }
}
