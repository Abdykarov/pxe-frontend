import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
    LOCALE_ID,
    NgModule,
} from '@angular/core';
import localeCs from '@angular/common/locales/cs';

import { CookieModule } from 'ngx-cookie';

import localeCsExtra from '@angular/common/locales/extra/cs';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { StaticRoutingModule } from './static.routing';
import { StaticComponent } from './static.component';
import { registerLocaleData } from '@angular/common';

@NgModule({
    declarations: [
        StaticComponent,
    ],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
        FooterModule,
        HeaderModule,
        HttpClientModule,
        NavigationModule,
        StaticRoutingModule,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'cs-CZ',
        },
    ],
    bootstrap: [
        StaticComponent,
    ],
})
export class StaticModule {

    constructor() {
        registerLocaleData(localeCs, localeCsExtra);
    }
}
