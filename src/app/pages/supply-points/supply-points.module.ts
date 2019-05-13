import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyPointsRoutingModule } from './supply-points.routing';
import { SupplyPointsComponent } from './supply-points.component';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        CommonModule,
        SupplyPointModule,
        SupplyPointsRoutingModule,
    ],
})
export class SupplyPointsModule {}
