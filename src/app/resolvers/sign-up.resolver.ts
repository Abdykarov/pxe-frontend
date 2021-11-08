import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ISignUp } from 'src/common/cms/models/sign-up';
import { SignUpService } from 'src/common/cms/services/sign-up.service';

@Injectable({
    providedIn: 'root',
})
export class SignUpResolver implements Resolve<any> {
    constructor(private signUpService: SignUpService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ISignUp> {
        return this.signUpService.getSignUp();
    }
}
