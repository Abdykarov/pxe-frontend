import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import {
    isPlatformBrowser,
    isPlatformServer,
} from '@angular/common';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import {
    makeStateKey,
    TransferState,
} from '@angular/platform-browser';

import {
    Observable,
    of,
} from 'rxjs';
import { tap } from 'rxjs/operators';

import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransferHttpResponseInterceptor implements HttpInterceptor {

    constructor(
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    private isRefreshToken = (req) => req.url.indexOf(CONSTS.CMS.REFRESH_TOKEN_URL) >= -1;

    private isCmsRequest = (req) => req.url.indexOf(CONSTS.CMS.REGEX_CONTAIN_CMS) >= -1;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            !this.isCmsRequest(req) ||
            this.isRefreshToken(req) &&
            environment.useDirectlyCMS
        ) {
            return next.handle(req);
        } else {
            const plainKey = req.body && req.body.operationName;

            if (!plainKey) {
                return next.handle(req);
            }
            const key = makeStateKey<HttpResponse<object>>(CONSTS.ANGULAR_UNIVERSAR_STATE_KEY_PREFIX + plainKey);

            if (isPlatformBrowser(this.platformId)) {

                // Try reusing transferred response from server
                const cachedResponse = this.transferState.get(key, null);
                if (cachedResponse) {
                    this.transferState.remove(key); // cached response should be used for the very first time
                    return of(new HttpResponse({
                        body: cachedResponse.body,
                        status: 200,
                        statusText: 'OK',
                        // headers are not transferred by current implementation.
                    }));
                }
                return next.handle(req);
            }

            if (isPlatformServer(this.platformId)) {
                // Try saving response to be transferred to browser
                return next.handle(req).pipe(tap(event => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        // Only body is preserved as it is and it seems sufficient for now.
                        // It would be nice to transfer whole response, but http response is not
                        // a POJO and it needs custom serialization/deserialization.
                        const response = {
                            body: event.body,
                        };
                        this.transferState.set(key, response);
                    }
                }));
            }
        }
        return next.handle(req);
    }
}