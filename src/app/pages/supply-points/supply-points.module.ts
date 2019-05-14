import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsComponent } from './supply-points.component';
import { SupplyPointsRoutingModule } from './supply-points.routing';
import { InfoBannerModule } from '../../../common/ui/info-banner/info-banner.module';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        SupplyPointModule,
        SupplyPointsRoutingModule,
        InfoBannerModule,
    ],
})
export class SupplyPointsModule {}
