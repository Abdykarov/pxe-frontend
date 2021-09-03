import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyPointComponent } from './page';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    exports: [
        SupplyPointComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        SupplyPointModule,
    ],
})
export class SupplyPointPageModule {}

export const supplyPointPageRoutes: Routes = [
    {
        path: 'supply-point',
        component: SupplyPointComponent,
        data: {
            isPublic: false,
        },
    },
];
