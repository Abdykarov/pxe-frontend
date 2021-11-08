import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { InfoBannerPageComponent } from './page';

@NgModule({
    declarations: [InfoBannerPageComponent],
    exports: [InfoBannerPageComponent],
    imports: [BreadcrumbModule, InfoBannerModule, CommonModule],
})
export class InfoBannerPageModule {}

export const infoBannerPageRoutes: Routes = [
    {
        path: 'info-banner',
        component: InfoBannerPageComponent,
    },
];
