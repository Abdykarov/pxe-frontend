import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { SamplePointsPageComponent } from './page';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        SamplePointsPageComponent,
    ],
    exports: [
        SamplePointsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        SupplyPointModule,
    ],
})
export class SamplePointsPageModule {}

export const samplePointsPageRoutes: Routes = [
    {
        path: 'sample-points',
        component: SamplePointsPageComponent,
    },
];
