import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointsSummaryModule } from 'src/common/ui/supply-points-summary/supply-points-summary.module';
import { SupplyPointOverviewComponent } from './page';

@NgModule({
    declarations: [SupplyPointOverviewComponent],
    exports: [SupplyPointOverviewComponent],
    imports: [BreadcrumbModule, CommonModule, SupplyPointsSummaryModule],
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
