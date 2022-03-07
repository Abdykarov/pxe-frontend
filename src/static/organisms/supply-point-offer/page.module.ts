import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';
import { SupplyPointOfferComponent } from './page';

@NgModule({
    declarations: [SupplyPointOfferComponent],
    exports: [SupplyPointOfferComponent],
    imports: [BreadcrumbModule, CommonModule, SupplyPointOfferModule],
})
export class SupplyPointOfferPageModule {}

export const supplyPointOfferPageRoutes: Routes = [
    {
        path: 'supply-point-offer',
        component: SupplyPointOfferComponent,
        data: {
            isPublic: false,
        },
    },
];
