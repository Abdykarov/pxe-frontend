import { isPlatformBrowser } from '@angular/common';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
    BUILD_ID_PROVIDER,
    CONSTS,
    IS_PRERENDER_PROVIDER,
} from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class TransferHttpResponseInterceptor implements HttpInterceptor {
    private nextRouteUrl: string;

    constructor(
        private transferState: TransferState,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
        @Inject(BUILD_ID_PROVIDER) public uuid: string,
        @Optional() @Inject(IS_PRERENDER_PROVIDER) private isPrerender: boolean
    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.nextRouteUrl =
                    event.url.substr(0, event.url.indexOf('#')) ||
                    event.url ||
                    '';
            }
        });
    }

    private isRefreshToken = (req) =>
        req.url.indexOf(CONSTS.CMS.REFRESH_TOKEN_URL) >= -1;

    private isCmsRequest = (req) =>
        req.url.indexOf(CONSTS.CMS.REGEX_CONTAIN_CMS) >= -1;

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            !this.isCmsRequest(req) ||
            (this.isRefreshToken(req) && this.isPrerender)
        ) {
            return next.handle(req);
        } else {
            const plainKey = req.body && req.body.operationName;
            const key = makeStateKey<HttpResponse<object>>(
                CONSTS.ANGULAR_UNIVERSAR_STATE_KEY_PREFIX + plainKey
            );

            if (!plainKey) {
                return next.handle(req);
            }

            if (isPlatformBrowser(this.platformId)) {
                // Try reusing transferred response from server
                const cachedResponse = this.transferState.get(key, null);
                if (cachedResponse) {
                    this.transferState.remove(key); // cached response should be used for the very first time
                    return of(
                        new HttpResponse({
                            body: cachedResponse.body,
                            status: 200,
                            statusText: 'OK',
                            // headers are not transferred by current implementation.
                        })
                    );
                }

                const urlData = (
                    this.nextRouteUrl +
                    '/data.json?v=' +
                    this.uuid
                ).replace('//', '/');

                const secureReq = req.clone({
                    url: urlData,
                    method: 'GET',
                    headers: req.headers.set('Accept', 'application/json'),
                });

                return next.handle(secureReq);
            }
        }
        return next.handle(req);
    }
}
