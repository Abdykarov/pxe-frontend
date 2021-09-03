import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from 'src/common/ui/header/header.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { FullLayoutComponent } from './full-layout.component';
import { FullLayoutRoutingModule } from './full-layout.routing';
import { PipesModule } from 'src/common/pipes/common/pipes.module';

@NgModule({
    declarations: [
        FullLayoutComponent,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FullLayoutRoutingModule,
        FooterModule,
        HttpClientModule,
        PipesModule,
    ],
})
export class FullLayoutModule {}
