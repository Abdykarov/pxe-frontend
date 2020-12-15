import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SupplyPointsDetailPageComponent } from './page';

@NgModule({
    declarations: [
        SupplyPointsDetailPageComponent,
    ],
    exports: [
        SupplyPointsDetailPageComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        FormModule,
    ],
})
export class SupplyPointsDetailPageModule {}

export const supplyPointsDetailPageRoutes: Routes = [
    {
        path: 'supply-points-detail',
        component: SupplyPointsDetailPageComponent,
        data: {
            isPublic: false,
        },
    },
];
