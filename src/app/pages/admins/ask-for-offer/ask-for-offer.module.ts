import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { AskForOfferRoutingModule } from './ask-for-offer-routing.module';
import { AskForOfferComponent } from './ask-for-offer.component';

@NgModule({
    declarations: [AskForOfferComponent],
    imports: [
        AlertModule,
        AskForOfferRoutingModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PaginationModule,
        PipesModule,
        PlaceloaderModule,
        TableModule,
        LoaderModule,
    ],
})
export class AskForOfferModule {}
