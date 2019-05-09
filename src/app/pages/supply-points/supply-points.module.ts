import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyPointsRoutingModule } from './supply-points.routing';
import { SupplyPointsComponent } from './supply-points.component';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        CommonModule,
        SupplyPointsRoutingModule,
    ],
})
export class SupplyPointsModule {}
