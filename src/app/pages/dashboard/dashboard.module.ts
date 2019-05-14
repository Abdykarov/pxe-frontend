import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { OverviewSupplyPointsModule } from 'src/common/ui/overview-supply-points/overview-supply-points.module';
import { OverviewSupplyPointsContainerModule } from '../../../common/containers/overview-supply-points-container/overview-supply-points-container.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        OverviewSupplyPointsModule,
        DashboardRoutingModule,
        OverviewSupplyPointsContainerModule,
    ],
})
export class DashboardModule { }
