import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';

import {
    Observable,
    throwError,
} from 'rxjs';
import { tap } from 'rxjs/operators';

import { LOGOUT } from 'src/app/routes/paths';

@Injectable({
    providedIn: 'root',
})
export class LogoutInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap(
                    (event: HttpEvent<any>) => {
                        // TODO: we can do something with non error response here
                    },
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                this.router.navigate([LOGOUT]);
                            }
                        }
                        return throwError(err);
                    },
                ),
            );
    }
}
