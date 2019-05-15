import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsComponent } from './supply-points.component';
import { SupplyPointsRoutingModule } from './supply-points.routing';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        SupplyPointModule,
        SupplyPointsRoutingModule,
    ],
})
export class SupplyPointsModule {}
