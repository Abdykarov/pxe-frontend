import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {

    constructor(
        private authService: AuthService,
    ) {}

    // kouknout cokkie x localstore
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        this.authService.startRefreshTokenInterval();
        return this.authService.refreshToken();
    }
}
