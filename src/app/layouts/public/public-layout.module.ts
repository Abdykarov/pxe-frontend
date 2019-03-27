import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutComponent } from './public-layout.component';
import { PublicLayoutRoutingModule } from './public-layout.routing';

@NgModule({
    declarations: [
        PublicLayoutComponent,
    ],
    imports: [
        CommonModule,
        PublicLayoutRoutingModule,
    ],
})
export class PublicLayoutModule {}
