import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BasicLayoutComponent } from './basic-layout.component';
import { BasicLayoutRoutingModule } from './basic-layout.routing';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';

@NgModule({
    declarations: [
        BasicLayoutComponent,
    ],
    imports: [
        BasicLayoutRoutingModule,
        CommonModule,
        FooterModule,
        HeaderModule,
        HttpClientModule,
        NavigationModule,
    ],
})
export class BasicLayoutModule {}
