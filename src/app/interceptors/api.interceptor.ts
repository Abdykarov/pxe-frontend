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
import { environment } from 'src/environments/environment';
import { scrollToElementFnc } from 'src/common/utils';

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

        let resultRequest = request.clone({
            setHeaders: {
                'X-API-Key': `${environment.x_api_key}`,
            },
        });

        if (
            request.url.match(/api\//) &&
            request.url.indexOf('login') < 0 &&
            request.url.indexOf('refresh') < 0
        ) {
                resultRequest = request.clone({
                    headers: this.authService.getAuthorizationHeaders('application/json'),
                });
        }

        return next.handle(resultRequest)
            .pipe(
                catchError((error, caught) => {
                    if (error.status === 401) {
                        this.authService.logoutForced();
                    } else {
                        scrollToElementFnc('top');
                    }
                    return throwError(error);
                }),
            );
    }
}
