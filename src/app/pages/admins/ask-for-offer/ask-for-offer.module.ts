import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { AskForOfferRoutingModule } from './ask-for-offer-routing.module';
import { AskForOfferComponent } from './ask-for-offer.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        AskForOfferComponent,
    ],
    imports: [
        AlertModule,
        AskForOfferRoutingModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PaginationModule,
        PlaceloaderModule,
        TableModule,
    ],
})
export class AskForOfferModule { }
//
