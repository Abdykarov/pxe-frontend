import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FullLayoutComponent } from './full-layout.component';
import { FullLayoutRoutingModule } from './full-layout.routing';
import { FooterModule } from 'src/common/ui/footer/footer.module';

@NgModule({
    declarations: [
        FullLayoutComponent,
    ],
    imports: [
        CommonModule,
        FullLayoutRoutingModule,
        FooterModule,
        HttpClientModule,
    ],
})
export class FullLayoutModule {}
