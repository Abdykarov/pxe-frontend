import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ICookiePolicy } from 'src/common/cms/models/cookie.policy';
import { CookiePolicyService } from 'src/common/cms/services/cookie-policy.service';

@Injectable({
    providedIn: 'root',
})
export class CookiePolicyResolver implements Resolve<any> {
    constructor(private cookiePolicyService: CookiePolicyService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ICookiePolicy> {
        return this.cookiePolicyService.getCookiePolicy();
    }
}
