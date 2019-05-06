import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SupplyPointComponent } from './supply-point.component';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    exports: [
        SupplyPointComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class SupplyPointModule {}
