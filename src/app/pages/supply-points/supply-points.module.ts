import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewSupplyPointsModule } from 'src/common/ui/overview-supply-points/overview-supply-points.module';
import { SupplyPointsRoutingModule } from './supply-points.routing';
import { SupplyPointsComponent } from './supply-points.component';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        CommonModule,
        OverviewSupplyPointsModule,
        SupplyPointsRoutingModule,
    ],
})
export class SupplyPointsModule {}
