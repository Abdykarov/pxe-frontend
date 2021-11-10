import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { mkdir, writeFile } from 'fs';
import { tap } from 'rxjs/operators';

const startsWithAny =
    (arr: string[] = []) =>
    (value = '') => {
        return arr.some((test) =>
            value.toLowerCase().startsWith(test.toLowerCase())
        );
    };

const isAbsoluteURL = startsWithAny(['http', '//']);

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
    constructor(
        private transferState: TransferState,
        @Inject('PAGE_URL') public pageUrl: string
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap((event: any) => {
                if (event instanceof HttpResponse) {
                    mkdir('./dist/fe/browser' + this.pageUrl, () => ({}));
                    writeFile(
                        './dist/fe/browser' + this.pageUrl + '/data.json',
                        JSON.stringify(event.body),
                        { flag: 'w' },
                        function (err) {
                            if (err) return console.error(err);
                        }
                    );
                    this.transferState.set(
                        makeStateKey(req.url),
                        <any>JSON.stringify(event.body)
                    );
                }
            })
        );
    }
}
