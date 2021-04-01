import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ITermsOfUSe } from 'src/common/cms/models/terms-of-use';
import { TermsOfUseService } from 'src/common/cms/services/terms-of-use.service';

@Injectable({
    providedIn: 'root',
})
export class TermsOfUseResolver implements Resolve<any> {

    constructor(
        private termsOfUse: TermsOfUseService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITermsOfUSe> {
        return this.termsOfUse.getTermsOfUse();
    }
}
