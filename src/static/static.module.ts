import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { StaticComponent } from './static.component';
import { StaticRoutingModule } from './static.routing';

@NgModule({
    declarations: [StaticComponent],
    imports: [
        BrowserModule,
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
    bootstrap: [StaticComponent],
})
export class StaticModule {
    constructor() {
        registerLocaleData(localeCs, localeCsExtra);
    }
}
