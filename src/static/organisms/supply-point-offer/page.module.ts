import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointOfferStaticComponent } from './page';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        SupplyPointOfferStaticComponent,
    ],
    exports: [
        SupplyPointOfferStaticComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        SupplyPointOfferModule,
    ],
})
export class SupplyPointOfferPageModule {}

export const supplyPointOfferPageRoutes: Routes = [
    {
        path: 'supply-point-offer',
        component: SupplyPointOfferStaticComponent,
    },
];
