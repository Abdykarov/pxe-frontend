import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointOverviewComponent } from './page';
import { SupplyPointsSummaryModule } from 'src/common/ui/supply-points-summary/supply-points-summary.module';

@NgModule({
    declarations: [
        SupplyPointOverviewComponent,
    ],
    exports: [
        SupplyPointOverviewComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        SupplyPointsSummaryModule,
    ],
})
export class SupplyPointOverviewPageModule {}

export const supplyPointOverviewPageRoutes: Routes = [
    {
        path: 'supply-point-overview',
        component: SupplyPointOverviewComponent,
        data: {
            isPublic: false,
        },
    },
];
