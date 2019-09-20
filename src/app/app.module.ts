import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import localeCsExtra from '@angular/common/locales/extra/cs';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { ApolloModule } from 'apollo-angular';
import { CookieModule } from 'ngx-cookie';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { PaginationModule } from 'ngx-bootstrap';

// own classes
import { ApolloGraphQLProvider } from 'src/common/graphql/middleware/apollo-graphql-provider';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
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
        PaginationModule.forRoot(),
        PipesModule,
        ReactiveFormsModule,
    ],
    providers: [
        ApolloGraphQLProvider,
        InterceptorProviders,
        {
            provide: LOCALE_ID,
            useValue: 'cs-CZ',
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
