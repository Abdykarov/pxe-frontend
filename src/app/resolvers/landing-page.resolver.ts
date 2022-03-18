import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ILandingPageContent } from 'src/common/cms/models/landing-page';
import { LandingPageService } from 'src/common/cms/services/landing-page.service';

@Injectable({
    providedIn: 'root',
})
export class LandingPageResolver implements Resolve<any> {
    constructor(private landingPageService: LandingPageService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ILandingPageContent> {
        return this.landingPageService.getLandingPage();
    }
}
