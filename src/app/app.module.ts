import { BrowserModule } from '@angular/platform-browser';
import localeCs from '@angular/common/locales/cs';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import localeCsExtra from '@angular/common/locales/extra/cs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import {
    ApolloModule,
    APOLLO_OPTIONS,
} from 'apollo-angular';
import { withClientState } from 'apollo-link-state';
import {
    HttpLinkModule,
    HttpLink,
} from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CookieModule } from 'ngx-cookie';

// own classes
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import {
    defaults,
    resolvers,
} from '../common/graphql/resolvers';
import { environment } from '../environments/environment';
import { InterceptorProviders } from './interceptors';
import { PipesModule } from 'src/common/pipes/pipes.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ApolloModule,
        AppRoutingModule,
        BrowserModule.withServerTransition({
            appId: 'pxe-pacr4retail',
        }),
        CookieModule.forRoot(),
        HttpClientModule,
        HttpLinkModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    providers: [
        InterceptorProviders,
        {
            provide: LOCALE_ID,
            useValue: 'cs-CZ',
        },
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                const cache = new InMemoryCache();
                const http = httpLink.create({
                    uri: `${environment.url}/graphql`,
                });
                const local = withClientState({
                    cache,
                    defaults,
                    resolvers,
                });
                return {
                    cache,
                    link: local.concat(http),
                    connectToDevTools: !environment.production,
                };
            },
            deps: [
                HttpLink,
            ],
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})

export class AppModule {

    constructor() {
        registerLocaleData(localeCs, localeCsExtra);
    }
}
