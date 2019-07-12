import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { RequestsOverviewComponent } from './requests-overview.component';
import { RequestsOverviewRoutingModule } from './requests-overview-routing.module';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';

@NgModule({
    declarations: [
        RequestsOverviewComponent,
    ],
    exports: [
        RequestsOverviewComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PipesModule,
        PlaceloaderModule,
        RequestsOverviewRoutingModule,
        RequestCardModule,
    ],
})
export class RequestsOverviewModule { }
