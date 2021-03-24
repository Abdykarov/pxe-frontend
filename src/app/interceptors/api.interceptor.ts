import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import {
    Observable,
    throwError,
} from 'rxjs';

// own classes
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { processErrorScrolls } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        console.log('API INTERCEPTOR');
        if (request.url.indexOf(CONSTS.CMS.REGEX_CONTAIN_CMS) !== -1) {
            return next.handle(request);
        }
        console.log('API INTERCEPTOR2');

        let resultRequest = request.clone({
            setHeaders: {
                'X-API-Key': `${environment.x_api_key}`,
            },
        });
        console.log('API INTERCEPTOR3');

        if (
            request.url.match(/api\//) &&
            request.url.indexOf('login') < 0 &&
            request.url.indexOf('export-csv') < 0
        ) {
            resultRequest = request.clone({
                headers: this.authService.getAuthorizationHeaders('application/json'),
            });
        }
        console.log('API INTERCEPTOR4');

        if (
            request.url.match(/api\//) &&
            request.url.indexOf('export-csv') > 0
        ) {
            resultRequest = request.clone({
                headers: this.authService.getAuthorizationHeaders('application/octet-stream'),
            });
        }
        console.log('API INTERCEPTOR5');

        return next.handle(resultRequest)
            .pipe(
                catchError((error, caught) => {
                    console.log('API INTERCEPTOR CATHCED');
                    console.log(error);
                    if (error.status === 401) {
                        this.authService.logoutForced();
                    } else {
                        processErrorScrolls();
                    }
                    return throwError(error);
                }),
            );
    }
}
