import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SignUpService } from 'src/common/cms/services/sign-up.service';

@Injectable({
    providedIn: 'root',
})
export class SignUpResolver implements Resolve<any> {

    constructor(
        private signUpService: SignUpService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.signUpService.getSignUp();
    }
}
