import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';
import { SupplyPointsOfferPageComponent } from './page';

@NgModule({
    declarations: [SupplyPointsOfferPageComponent],
    exports: [SupplyPointsOfferPageComponent],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class SupplyPointsOfferPageModule {}

export const supplyPointsOfferPageRoutes: Routes = [
    {
        path: 'supply-points-offer',
        component: SupplyPointsOfferPageComponent,
        data: {
            isPublic: false,
        },
    },
];
