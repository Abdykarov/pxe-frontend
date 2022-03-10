import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// own classes
import { BannersPageComponent } from './page';

@NgModule({
    declarations: [BannersPageComponent],
    exports: [BannersPageComponent],
    imports: [BreadcrumbModule, BannerUIModule, CommonModule],
})
export class BannersPageModule {}

export const bannersPageRoutes: Routes = [
    {
        path: 'banners',
        component: BannersPageComponent,
    },
];
