import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { OfferSelectionPageComponent } from './page';

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
    ],
})
export class OfferSelectionPageModule {}

export const offerSelectionPageRoutes: Routes = [
    {
        path: 'offer-selection',
        component: OfferSelectionPageComponent,
    },
];
