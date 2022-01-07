import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as R from 'ramda';
import { tap } from 'rxjs/operators';
import { BUILD_ID_PROVIDER, CONSTS, PAGE_URL_PROVIDER } from '../app.constants';

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

@Injectable()
export class SquidexInterceptor implements HttpInterceptor {
    constructor(
        private transferState: TransferState,
        @Inject(PAGE_URL_PROVIDER) public pageUrl: string,
        @Inject(BUILD_ID_PROVIDER) public uuid: string
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap((event: any) => {
                if (
                    event instanceof HttpResponse &&
                    req.url ===
                        'https://squidex.lnd.bz/api/content/pxe-parc4u/graphql'
                ) {
                    const plainKey = req.body && req.body.operationName;
                    const key = makeStateKey<HttpResponse<object>>(
                        CONSTS.ANGULAR_UNIVERSAR_STATE_KEY_PREFIX + plainKey
                    );
                    const response = {
                        body: event.body,
                    };

                    if (this.pageUrl.includes(CONSTS.PATHS.GENERATE_DATA)) {
                        this.pageUrl = getParameterByName('page', this.pageUrl);
                    }

                    const dirPath = './dist/app' + this.pageUrl;
                    const dataPath = dirPath + '/data.json';
                    if (existsSync(dataPath)) {
                        const data = readFileSync(dataPath, 'utf8');
                        const content = JSON.parse(data);
                        const finalData = R.mergeDeepLeft(
                            response.body,
                            content
                        );
                        writeFileSync(
                            dataPath,
                            JSON.stringify(finalData), //pak finalData
                            { flag: 'w' }
                        );
                        this.transferState.set(key, response);
                    } else {
                        mkdirSync(dirPath, { recursive: true });
                        writeFileSync(dataPath, JSON.stringify(event.body), {
                            flag: 'w',
                        });
                        this.transferState.set(key, response);
                    }
                }
            })
        );
    }
}
