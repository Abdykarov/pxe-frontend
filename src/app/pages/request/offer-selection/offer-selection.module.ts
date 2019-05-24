import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OfferSelectionComponent } from './offer-selection.component';
import { OfferSelectionRoutingModule } from './offer-selection.routing';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        OfferSelectionComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        OfferSelectionRoutingModule,
        PipesModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class OfferSelectionModule {}
