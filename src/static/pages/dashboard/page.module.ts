import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { DashboardComponent } from 'src/static/pages/dashboard/page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { NewsModule } from 'src/common/ui/news/news.module';
import { SupplyPointsSummaryModule } from 'src/common/ui/supply-points-summary/supply-points-summary.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        CommonModule,
        InfoBannerModule,
        NewsModule,
        SupplyPointsSummaryModule,
    ],
})
export class DashboardPageModule {}

export const dashboardPageRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            isPublic: false,
        },
    },
];
