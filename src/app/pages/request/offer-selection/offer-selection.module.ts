import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OfferSelectionComponent } from './offer-selection.component';
import { OfferSelectionRoutingModule } from './offer-selection.routing';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        OfferSelectionComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        OfferSelectionRoutingModule,
        ProgressBarModule,
    ],
})
export class OfferSelectionModule {}
