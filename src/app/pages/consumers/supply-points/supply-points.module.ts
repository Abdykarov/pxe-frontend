import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SecuredPipesModule } from 'src/common/pipes/secured/secured-pipes.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsComponent } from './supply-points.component';
import { SupplyPointsRoutingModule } from './supply-points.routing';

@NgModule({
    declarations: [
        SupplyPointsComponent,
    ],
    imports: [
        AlertModule,
        BadgeModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PipesModule,
        PlaceloaderModule,
        SecuredPipesModule,
        SupplyPointModule,
        SupplyPointsRoutingModule,
    ],
})
export class SupplyPointsModule {}
