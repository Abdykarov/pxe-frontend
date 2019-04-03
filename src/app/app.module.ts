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
import { Router } from '@angular/router';

import {
    ApolloModule,
    APOLLO_OPTIONS,
} from 'apollo-angular';
import {
    HttpLinkModule,
    HttpLink,
} from 'apollo-angular-link-http';

// own classes
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { apolloGraphqlFactory } from '../common/graphql/middleware/apollo-graphql-factory';
import { InterceptorProviders } from './interceptors';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ApolloModule,
        AppRoutingModule,
        BrowserModule,
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
            useFactory: apolloGraphqlFactory,
            deps: [
                HttpLink,
                AuthService,
                Router,
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
