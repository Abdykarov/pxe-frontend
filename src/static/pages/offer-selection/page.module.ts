import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { OfferSelectionPageComponent } from './page';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        OfferSelectionPageComponent,
    ],
    exports: [
        OfferSelectionPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        PipesModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class OfferSelectionPageModule {}

export const offerSelectionPageRoutes: Routes = [
    {
        path: 'offer-selection',
        component: OfferSelectionPageComponent,
    },
];
