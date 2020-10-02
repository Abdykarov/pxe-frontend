import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LandingPageService } from 'src/common/cms/services/landing-page.service';

@Injectable({
    providedIn: 'root',
})
export class LandingPageResolver implements Resolve<any> {

    constructor(
        private landingPageService: LandingPageService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.landingPageService.getLandingPage();
    }
}
