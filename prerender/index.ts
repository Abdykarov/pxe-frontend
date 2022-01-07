/***************************************************************************************************
 * Initialize the server environment - for example, adding DOM built-in types to the global scope.
 *
 * NOTE:
 * This import must come before any imports (direct or transitive) that rely on DOM built-ins being
 * available, such as `@angular/elements`.
 */
import { enableProdMode, StaticProvider, Type } from '@angular/core';
import { renderModule as renderModuleOld } from '@angular/platform-server';
import '@angular/platform-server/init';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
    BUILD_ID_PROVIDER_SERVER,
    IS_PRERENDER_PROVIDER,
    PAGE_URL_PROVIDER,
} from '../src/app/app.constants';
import '../ssr/init';
import { DIST_FOLDER } from '../ssr/utils/config';

enableProdMode();

export { AppServerModule } from 'src/app/server/app.server.module';
export { renderModule };

const buildId = readFileSync(
    join(DIST_FOLDER, 'data', 'build-id.text'),
    'utf-8'
);

const renderModule = (
    module: Type<any>,
    options: {
        document?: string;
        url?: string;
        extraProviders?: StaticProvider[];
    }
) => {
    return renderModuleOld(module, {
        document: options.document,
        url: options.url,
        extraProviders: [
            { provide: PAGE_URL_PROVIDER, useValue: options.url },
            { provide: IS_PRERENDER_PROVIDER, useValue: true },
            { provide: BUILD_ID_PROVIDER_SERVER, useValue: buildId },
        ],
    });
};
