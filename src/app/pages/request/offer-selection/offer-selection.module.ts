import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OfferSelectionComponent } from './offer-selection.component';
import { OfferSelectionRoutingModule } from './offer-selection.routing';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        OfferSelectionComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        OfferSelectionRoutingModule,
        PipesModule,
        PlaceloaderModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class OfferSelectionModule {}
