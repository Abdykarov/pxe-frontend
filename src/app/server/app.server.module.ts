import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
    ServerModule,
    ServerTransferStateModule,
} from '@angular/platform-server';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { CookieBackendService, CookieService } from 'ngx-cookie';
import { AppComponent } from '../app.component';
import { BUILD_ID_PROVIDER_SERVER } from '../app.constants';
import { AppModule } from '../app.module';
import { SquidexInterceptor } from './squidex.interceptor';
import { UniversalInterceptor } from './universal.interceptor';

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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SquidexInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
    constructor(
        private metaService: Meta,
        @Inject(BUILD_ID_PROVIDER_SERVER) public buildId: string
    ) {
        this.metaService.updateTag({
            name: 'build-id',
            content: this.buildId,
        });
    }
}
