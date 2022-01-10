import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LogoutInformationModule } from 'src/common/ui/logout-informationation/logout-information.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { OverviewContainerComponent } from './overview-container.component';

@NgModule({
    declarations: [OverviewContainerComponent],
    exports: [OverviewContainerComponent],
    imports: [
        AlertModule,
        BadgeModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LogoutInformationModule,
        PlaceloaderModule,
        SupplyPointModule,
    ],
})
export class OverviewContainerModule {}
