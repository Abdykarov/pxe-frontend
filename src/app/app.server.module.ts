import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import {
    CookieBackendService,
    CookieService,
} from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UniversalInterceptor } from 'src/app/interceptors/universal.interceptor';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
    ],
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
    bootstrap: [
        AppComponent,
    ],
})
export class AppServerModule {}
