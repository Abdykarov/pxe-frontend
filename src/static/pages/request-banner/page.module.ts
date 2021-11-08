import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { RequestBannerPageComponent } from './page';

@NgModule({
    declarations: [RequestBannerPageComponent],
    exports: [RequestBannerPageComponent],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
    ],
})
export class RequestBannerPageModule {}

export const requestBannerPageRoutes: Routes = [
    {
        path: 'request-banner',
        component: RequestBannerPageComponent,
        data: {
            isPublic: false,
        },
    },
];
