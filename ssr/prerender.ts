import { appState } from './jobs/appState';

/***************************************************************************************************
 * Initialize the server environment - for example, adding DOM built-in types to the global scope.
 *
 * NOTE:
 * This import must come before any imports (direct or transitive) that rely on DOM built-ins being
 * available, such as `@angular/elements`.
 */
import './init';
console.log("___");
console.log(appState);
import '@angular/platform-server/init';

import { enableProdMode, StaticProvider, Type } from '@angular/core';

enableProdMode();

export { AppServerModule } from 'src/app/server/app.server.module';
import { renderModule as dd, renderModuleFactory } from '@angular/platform-server';

const sdsd = (module: Type<any>, options: {
    document?: string;
    url?: string;
    extraProviders?: StaticProvider[];
}) => {
    return dd(
        module,
        {
            document: options.document,
            url: options.url,
            extraProviders:  [{ provide: "PAGE_URL", useValue: options.url }]
        }
    );
}

export { sdsd as renderModule }
