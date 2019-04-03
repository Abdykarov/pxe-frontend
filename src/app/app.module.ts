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

import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

// own classes
import { ApolloGraphQLProvider } from '../common/graphql/middleware/apollo-graphql-provider';
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
        BrowserModule,
        HttpClientModule,
        HttpLinkModule,
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
