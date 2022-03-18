import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointsPageComponent } from './page';

@NgModule({
    declarations: [SupplyPointsPageComponent],
    exports: [SupplyPointsPageComponent],
    imports: [
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        SupplyPointModule,
    ],
})
export class SupplyPointsPageModule {}

export const supplyPointsPageRoutes: Routes = [
    {
        path: 'supply-points',
        component: SupplyPointsPageComponent,
        data: {
            isPublic: false,
        },
    },
];
