import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    ServerModule,
    ServerTransferStateModule,
} from '@angular/platform-server';
import { CookieBackendService, CookieService } from 'ngx-cookie';
import { UniversalInterceptor } from 'src/app/interceptors/universal.interceptor';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule, ServerModule, ServerTransferStateModule],
    providers: [
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
export class AppServerModule {}
