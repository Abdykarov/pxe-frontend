import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsComponent } from './supply-points.component';
import { SupplyPointsRoutingModule } from './supply-points.routing';

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
