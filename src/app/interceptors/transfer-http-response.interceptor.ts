import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {tap} from 'rxjs/operators';
import { environment } from '../../environments/environment';

const STATE_KEY_PREFIX = 'http_requests:';

@Injectable({
    providedIn: 'root',
})
export class TransferHttpResponseInterceptor implements HttpInterceptor {
    constructor(private transferState: TransferState,
                @Inject(PLATFORM_ID) private platformId: string) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('squidex') === -1 || req.url.indexOf('identity-server/connect/token') >= -1 && environment.useDirectlyCMS) {
            return next.handle(req);
        } else {
            const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + req.body.operationName);

            if (isPlatformBrowser(this.platformId)) {

                // Try reusing transferred response from server
                const cachedResponse = this.transferState.get(key, null);
                if (cachedResponse) {
                    this.transferState.remove(key); // cached response should be used for the very first time
                    return of(new HttpResponse({
                        body: cachedResponse.body,
                        status: 200,
                        statusText: 'OK (from server)',
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
    }
}
