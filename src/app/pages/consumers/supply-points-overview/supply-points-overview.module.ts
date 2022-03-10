import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyPointsOverviewContainerModule } from 'src/common/containers/supply-points-overview/supply-points-overview-container.module';
import { SupplyPointsOverviewComponent } from './supply-points-overview.component';
import { SupplyPointsOverviewRoutingModule } from './supply-points-overview.routing';

@NgModule({
    declarations: [SupplyPointsOverviewComponent],
    imports: [
        SupplyPointsOverviewContainerModule,
        SupplyPointsOverviewRoutingModule,
        LayoutContainerModule,
    ],
})
export class SupplyPointsOverviewModule {}
