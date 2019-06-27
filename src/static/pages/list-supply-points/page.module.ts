import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ListSupplyPointsPageComponent } from './page';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        ListSupplyPointsPageComponent,
    ],
    exports: [
        ListSupplyPointsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        SupplyPointModule,
    ],
})
export class ListSupplyPointsPageModule {}

export const listSupplyPointsPageRoutes: Routes = [
    {
        path: 'list-supply-points',
        component: ListSupplyPointsPageComponent,
    },
];
