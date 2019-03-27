import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// This app's ngModules
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';

import { StaticRoutingModule } from './static.routing';
import { StaticComponent } from './static.component';

@NgModule({
    declarations: [
        StaticComponent,
    ],
    imports: [
        BrowserModule,
        FooterModule,
        HeaderModule,
        HttpClientModule,
        NavigationModule,
        StaticRoutingModule,
    ],
    providers: [],
    bootstrap: [
        StaticComponent,
    ],
})
export class StaticModule {}
