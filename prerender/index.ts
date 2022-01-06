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
import '../ssr/init';

enableProdMode();

export { AppServerModule } from 'src/app/server/app.server.module';
export { renderModule };

const buildUUID = readFileSync('uuid.text', 'utf-8').replace('\n', '');

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
            { provide: 'PAGE_URL', useValue: options.url },
            { provide: 'UUID', useValue: buildUUID },
        ],
    });
};
