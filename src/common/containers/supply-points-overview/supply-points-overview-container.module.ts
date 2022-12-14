import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { SecuredPipesModule } from 'src/common/pipes/secured/secured-pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsOverviewContainerComponent } from './supply-points-overview-container.component';

@NgModule({
    declarations: [SupplyPointsOverviewContainerComponent],
    exports: [SupplyPointsOverviewContainerComponent],
    imports: [
        CommonModule,
        ButtonModule,
        SupplyPointModule,
        PipesModule,
        PlaceloaderModule,
        AlertModule,
        InfoBannerModule,
        BadgeModule,
        SecuredPipesModule,
    ],
})
export class SupplyPointsOverviewContainerModule {}
