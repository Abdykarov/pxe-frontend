import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import {
    ServerModule,
    ServerTransferStateModule,
} from '@angular/platform-server';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { CookieBackendService, CookieService } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UniversalInterceptor } from './interceptors/universal.interceptor';

// import { UniversalInterceptor } from './interceptors/universal.interceptor';

@NgModule({
    imports: [AppModule, ServerModule, ServerTransferStateModule],
    providers: [
        {
            provide: REQUEST,
            useValue: REQUEST,
        },
        {
            provide: RESPONSE,
            useValue: RESPONSE,
        },
        // Add universal-only providers here
        {
            provide: CookieService,
            useClass: CookieBackendService,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UniversalInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
    constructor(@Inject('PAGE_URL') public pageUrl: string) {
        console.log('PAGE_URL');
        console.log(this.pageUrl);
    }
}
