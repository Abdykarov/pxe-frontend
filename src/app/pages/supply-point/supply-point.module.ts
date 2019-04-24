import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyPointRoutingModule } from './supply-point-routing.module';
import { SupplyPointComponent } from './supply-point.component';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    imports: [
        CommonModule,
        SupplyPointRoutingModule,
    ],
})
export class SupplyPointModule {}
