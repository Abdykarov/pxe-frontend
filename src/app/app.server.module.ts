import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import {
    CookieBackendService,
    CookieService,
} from 'ngx-cookie';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
    AppModule,
    ServerModule
],
    providers: [
        // Add universal-only providers here
        {
            provide: CookieService,
            useClass: CookieBackendService,
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppServerModule {}
