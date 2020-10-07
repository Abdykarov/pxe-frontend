import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { TermsOfUseService } from 'src/common/cms/services/terms-of-use.service';

@Injectable({
    providedIn: 'root',
})
export class TermsOfUseResolver implements Resolve<any> {

    constructor(
        private termsOfUse: TermsOfUseService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.termsOfUse.getTermsOfUse();
    }
}
