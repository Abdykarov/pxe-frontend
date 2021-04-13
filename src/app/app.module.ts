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
    RecaptchaModule,
} from 'ng-recaptcha';
import { TransferHttpCacheModule } from '@nguniversal/common';

// own classes
import { ApolloCMSGraphQLProvider } from 'src/common/cms/middleware/apollo-cms-graphql-provider';
import { ApolloGraphQLProvider } from 'src/common/graphql/middleware/apollo-graphql-provider';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
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
        RecaptchaModule,
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
                siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // TEST
//                siteKey: '6Ldp0xgUAAAAAF_iIss_hpFaVrjLbPGjwyfJwebB', // ERROR
                size: 'invisible',
                errorMode: 'handled',
                badge: 'none',
            },
        },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'cs', // use French language
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
