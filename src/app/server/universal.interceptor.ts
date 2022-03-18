import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

const startsWithAny =
    (arr: string[] = []) =>
    (value = '') => {
        return arr.some((test) =>
            value.toLowerCase().startsWith(test.toLowerCase())
        );
    };

const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable({
    providedIn: 'root',
})
export class UniversalInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.request && !isAbsoluteURL(req.url)) {
            const protocolHost = `${this.request.protocol}://${this.request.get(
                'host'
            )}`;
            const pathSeparator = !req.url.startsWith('/') ? '/' : '';
            const url = protocolHost + pathSeparator + req.url;
            const serverRequest = req.clone({ url });
            return next.handle(serverRequest);
        } else {
            return next.handle(req);
        }
    }
}
