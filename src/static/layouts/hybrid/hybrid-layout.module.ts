import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from 'src/common/ui/header/header.module';
import { HybridLayoutComponent } from './hybrid-layout.component';
import { HybridLayoutRoutingModule } from './hybrid-layout.routing';
import { FooterModule } from 'src/common/ui/footer/footer.module';

@NgModule({
    declarations: [
        HybridLayoutComponent,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        HybridLayoutRoutingModule,
        FooterModule,
        HttpClientModule,
    ],
})
export class HybridLayoutModule {}
