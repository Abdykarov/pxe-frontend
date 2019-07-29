import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { NewsContainerModule } from 'src/common/containers/news-conteiner/news-conteiner.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointOverviewModule } from 'src/common/ui/supply-point-overview/supply-point-overview.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        CommonModule,
        DashboardRoutingModule,
        InfoBannerModule,
        LayoutContainerModule,
        NewsContainerModule ,
        PlaceloaderModule,
        SupplyPointOverviewModule,

    ],
})
export class DashboardModule { }
