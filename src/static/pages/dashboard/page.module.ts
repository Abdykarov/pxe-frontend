import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { DashboardComponent } from 'src/static/pages/dashboard/page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { NewsContainerModule } from 'src/common/containers/news-conteiner/news-conteiner.module';
import { SupplyPointOverviewModule } from 'src/common/ui/supply-point-overview/supply-point-overview.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        InfoBannerModule,
        NewsContainerModule ,
        SupplyPointOverviewModule,
    ],
})
export class DashboardPageModule {}

export const dashboardPageRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
];
