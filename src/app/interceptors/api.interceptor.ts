import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

// own classes
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

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

        if (request.url.match(/api\//) &&
            request.url.indexOf('login') < 0 &&
            request.url.indexOf('refresh') < 0) {
                resultRequest = request.clone({
                    headers: new HttpHeaders({
                        'Authorization': 'Bearer ' + this.authService.getToken(),
                        'Content-Type': 'application/json',
                        'X-API-Key': `${environment.x_api_key}`,
                    }),
                });
        }

        return next.handle(resultRequest);
    }
}
