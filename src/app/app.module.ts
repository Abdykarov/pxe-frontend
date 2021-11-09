import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CookieModule } from 'ngx-cookie';
// own classes
import { ApolloCMSGraphQLProvider } from 'src/common/cms/middleware/apollo-cms-graphql-provider';
import { ApolloGraphQLProvider } from 'src/common/graphql/middleware/apollo-graphql-provider';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { environment } from 'src/environments/environment';
import { FileUploadModule } from 'src/third-sides/file-upload';
import { PdfJsViewerModule } from 'src/third-sides/ng2-pdfjs-viewer/ng2-pdfjs-viewer.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { GlobalErrorHandler } from './errors/global.error.handler';
import { InterceptorProviders } from './interceptors';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule.withServerTransition({
            appId: 'pxe-pacr4retail',
        }),
        CarouselModule.forRoot(),
        CookieModule.forRoot(),
        PdfJsViewerModule.forRoot(),
        FileUploadModule,
        HttpClientModule,
        PipesModule,
        ReactiveFormsModule,
        TransferHttpCacheModule,
    ],
    providers: [
        ApolloGraphQLProvider,
        ApolloCMSGraphQLProvider,
        InterceptorProviders,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
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
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        registerLocaleData(localeCs, localeCsExtra);
    }
}
