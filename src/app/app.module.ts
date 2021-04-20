import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import localeCsExtra from '@angular/common/locales/extra/cs';
import {
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { ApolloModule } from 'apollo-angular';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CookieModule } from 'ngx-cookie';
import { HttpLinkModule } from 'apollo-angular-link-http';
import {
    RECAPTCHA_LANGUAGE,
    RECAPTCHA_SETTINGS,
} from 'ng-recaptcha';
import { TransferHttpCacheModule } from '@nguniversal/common';

// own classes
import { ApolloCMSGraphQLProvider } from 'src/common/cms/middleware/apollo-cms-graphql-provider';
import { ApolloGraphQLProvider } from 'src/common/graphql/middleware/apollo-graphql-provider';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { environment } from 'src/environments/environment';
import { FileUploadModule } from 'src/third-sides/file-upload';
import { InterceptorProviders } from './interceptors';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PdfJsViewerModule } from 'src/third-sides/ng2-pdfjs-viewer/ng2-pdfjs-viewer.module';

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
        CarouselModule.forRoot(),
        CookieModule.forRoot(),
        PdfJsViewerModule.forRoot(),
        FileUploadModule,
        HttpClientModule,
        HttpLinkModule,
        PipesModule,
        ReactiveFormsModule,
        TransferHttpCacheModule,
    ],
    providers: [
        ApolloGraphQLProvider,
        ApolloCMSGraphQLProvider,
        InterceptorProviders,
        {
            provide: LOCALE_ID,
            useValue: 'cs-CZ',
        },
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: environment.re_captcha?.siteKey,
                size: environment.re_captcha?.size,
                errorMode: environment.re_captcha?.errorMode,
                badge: environment.re_captcha?.badge,
            },
        },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'cs',
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

Validators.required.prototype.isRequiredValidator = true;
