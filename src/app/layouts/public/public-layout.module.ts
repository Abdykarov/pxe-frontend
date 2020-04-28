import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutComponent } from './public-layout.component';
import { PublicLayoutRoutingModule } from './public-layout.routing';

import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { PipesModule } from 'src/common/pipes/pipes.module';

@NgModule({
    declarations: [
        PublicLayoutComponent,
    ],
    imports: [
        CommonModule,
        FooterModule,
        HeaderModule,
        PipesModule,
        PublicLayoutRoutingModule,
    ],
})
export class PublicLayoutModule {}
