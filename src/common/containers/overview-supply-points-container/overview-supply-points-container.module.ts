import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewSupplyPointsContainerComponent } from './overview-supply-points-container.component';
import { OverviewSupplyPointsModule } from 'src/common/ui/overview-supply-points/overview-supply-points.module';

@NgModule({
    declarations: [
        OverviewSupplyPointsContainerComponent,
    ],
    exports: [
        OverviewSupplyPointsContainerComponent,
    ],
    imports: [
        CommonModule,
        OverviewSupplyPointsModule,
    ],
})
export class OverviewSupplyPointsContainerModule {}
