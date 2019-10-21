import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import {
    Observable,
    of,
} from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class RefreshTokenResolver implements Resolve<any> {

    constructor(
        private authService: AuthService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        this.authService.startRefreshTokenInterval();
        if (route.queryParams.isFromLogin) {
            return of({});
        } else {
            return this.authService.refreshToken()
                .pipe(
                    catchError(() => of()),
                );
        }
    }
}
