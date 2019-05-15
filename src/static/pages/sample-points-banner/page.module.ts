import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { SamplePointsBannerPageComponent } from './page';

@NgModule({
    declarations: [
        SamplePointsBannerPageComponent,
    ],
    exports: [
        SamplePointsBannerPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
    ],
})
export class SamplePointsBannerPageModule {}

export const samplePointsBannerPageRoutes: Routes = [
    {
        path: 'sample-points-banner',
        component: SamplePointsBannerPageComponent,
    },
];
