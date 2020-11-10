import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ILandingPage } from 'src/common/cms/models/landing-page';
import { LandingPageService } from 'src/common/cms/services/landing-page.service';

@Injectable({
    providedIn: 'root',
})
export class LandingPageResolver implements Resolve<any> {

    constructor(
        private landingPageService: LandingPageService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILandingPage> {
        return this.landingPageService.getLandingPage();
    }
}
