import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointOverviewComponent } from './page';
import { SupplyPointOverviewModule } from 'src/common/ui/supply-point-overview/supply-point-overview.module';

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
        SupplyPointOverviewModule,
    ],
})
export class SupplyPointOverviewPageModule {}

export const supplyPointOverviewPageRoutes: Routes = [
    {
        path: 'supply-point-overview',
        component: SupplyPointOverviewComponent,
    },
];
