import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    ApolloModule,
    APOLLO_OPTIONS,
} from 'apollo-angular';
import {
    HttpLinkModule,
    HttpLink,
} from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';

// own classes
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { InterceptorProviders } from './interceptors';
import { environment } from '../environments/environment';
import { PipesModule } from 'src/common/pipes/pipes.module';

console.log('ENVIRONMENt', environment);

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
            useFactory: (httpLink: HttpLink) => ({
                cache: new InMemoryCache(),
                link: httpLink.create({
                    uri: `${environment.url}/graphql`,
                }),
            }),
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
