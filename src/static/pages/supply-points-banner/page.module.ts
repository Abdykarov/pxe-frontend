import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { SupplyPointsBannerPageComponent } from './page';

@NgModule({
    declarations: [
        SupplyPointsBannerPageComponent,
    ],
    exports: [
        SupplyPointsBannerPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
    ],
})
export class SupplyPointsBannerPageModule {}

export const supplyPointsBannerPageRoutes: Routes = [
    {
        path: 'supply-points-banner',
        component: SupplyPointsBannerPageComponent,
        data: {
            isPublic: false,
        },
    },
];
