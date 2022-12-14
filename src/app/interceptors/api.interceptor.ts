import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
// own classes
import { AuthService } from 'src/app/services/auth.service';
import { processErrorScrolls } from 'src/common/utils';
import { environment } from 'src/environments/environment';

/**
 * Add headers to requests for auth, ...
 * File uploader and Apollo-Angular do not use httpClient.
 */
@Injectable({
    providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const isCmsRequest =
            request.url.indexOf(CONSTS.CMS.REGEX_CONTAIN_CMS) !== -1 ||
            request.url.indexOf(CONSTS.CMS.REGEX_CONTAIN_CMS_DIRECT) !== -1;
        if (isCmsRequest) {
            return next.handle(request);
        }

        let resultRequest = request.clone({
            setHeaders: {
                'X-API-Key': `${environment.x_api_key}`,
            },
        });

        const isRestRequestToApiWithoutLogin =
            request.url.match(/api\//) &&
            request.url.indexOf('login') < 0 &&
            request.url.indexOf('export-csv') < 0;
        if (isRestRequestToApiWithoutLogin) {
            resultRequest = request.clone({
                headers:
                    this.authService.getAuthorizationHeaders(
                        'application/json'
                    ),
            });
        }

        const isExportCsvRequest =
            request.url.match(/api\//) && request.url.indexOf('export-csv') > 0;
        if (isExportCsvRequest) {
            resultRequest = request.clone({
                headers: this.authService.getAuthorizationHeaders(
                    'application/octet-stream'
                ),
            });
        }

        return next.handle(resultRequest).pipe(
            catchError((error, caught) => {
                if (error.status === 401) {
                    this.authService.logoutForced();
                } else {
                    processErrorScrolls();
                }
                return throwError(error);
            })
        );
    }
}
