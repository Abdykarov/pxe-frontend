import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ILogin } from 'src/common/cms/models/login';
import { LoginService } from 'src/common/cms/services/login.service';

@Injectable({
    providedIn: 'root',
})
export class LoginResolver implements Resolve<any> {

    constructor(
        private loginService: LoginService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILogin> {
        return this.loginService.getLogin();
    }
}
