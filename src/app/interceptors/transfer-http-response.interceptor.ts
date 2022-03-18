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
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
    ARTICLES_PAGE,
    BUILD_ID_PROVIDER,
    CONSTS,
    IS_PRERENDER_PROVIDER,
} from 'src/app/app.constants';
import { environment } from 'src/environments/environment';

/**
 * Interceptor for work with squidex.
 */
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
            const eventUrl = event['url'];
            if (eventUrl) {
                this.nextRouteUrl = this.processUrlFromFragment(eventUrl);
                return;
            }
        });
    }

    private processUrlFromFragment = (url: string) =>
        url.substr(0, url.indexOf('#')) || url || '';

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
            (this.isRefreshToken(req) &&
                (this.isPrerender || environment.useDirectlyCMS))
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
                // Process script tag in html
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

                const isPageFilterData = req.headers.has(ARTICLES_PAGE);

                let url = `${this.nextRouteUrl}/data${
                    isPageFilterData ? `-${req.headers.get(ARTICLES_PAGE)}` : ''
                }.json?v=${this.uuid}`.replace('//', '/');

                const secureReq = req.clone({
                    url,
                    method: 'GET',
                    headers: req.headers.set('Accept', 'application/json'),
                });

                return next.handle(secureReq);
            }
        }
        return next.handle(req);
    }
}
