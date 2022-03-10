import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';
import { OfferSelectionComponent } from './offer-selection.component';
import { OfferSelectionRoutingModule } from './offer-selection.routing';

@NgModule({
    declarations: [OfferSelectionComponent],
    imports: [
        AlertModule,
        ButtonModule,
        BannerUIModule,
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
