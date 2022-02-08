import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as R from 'ramda';
import { tap } from 'rxjs/operators';
import {
    ARTICLES_PAGE,
    BUILD_ID_PROVIDER,
    CONSTS,
    PAGE_URL_PROVIDER,
} from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { APP_FOLDER } from 'src/server/shared/consts';

@Injectable()
export class SquidexInterceptor implements HttpInterceptor {
    constructor(
        private transferState: TransferState,
        private router: Router,
        @Inject(PAGE_URL_PROVIDER) public pageUrl: string,
        @Inject(BUILD_ID_PROVIDER) public uuid: string
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap((event: any) => {
                if (
                    event instanceof HttpResponse &&
                    req.url ===
                        `${environment.url_cms}/api/content/pxe-parc4u/graphql`
                ) {
                    const plainKey = req.body && req.body.operationName;
                    const key = makeStateKey<HttpResponse<object>>(
                        CONSTS.ANGULAR_UNIVERSAR_STATE_KEY_PREFIX + plainKey
                    );
                    const response = {
                        body: event.body,
                    };

                    if (this.pageUrl.includes(CONSTS.PATHS.GENERATE_DATA)) {
                        const tree = this.router.parseUrl(this.pageUrl);
                        const primary = tree.root.children[PRIMARY_OUTLET];
                        this.pageUrl = R.last(primary.segments).path;
                    }

                    const dirPath = join(APP_FOLDER, this.pageUrl);
                    if (req.headers.has(ARTICLES_PAGE)) {
                        const page = req.headers.get(ARTICLES_PAGE);

                        if (parseInt(page) > 1) {
                            mkdirSync(dirPath, { recursive: true });
                            writeFileSync(
                                `${dirPath}/data-${page}.json`,
                                JSON.stringify(event.body),
                                {
                                    flag: 'w',
                                }
                            );
                        }
                        return;
                    }

                    const dataPath = `${dirPath}/data.json`;

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
