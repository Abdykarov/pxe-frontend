import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BannersPageComponent } from './page';

// own modules
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        BannersPageComponent,
    ],
    exports: [
        BannersPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        BannerUIModule,
        CommonModule,
    ],
})
export class BannersPageModule {}

export const bannersPageRoutes: Routes = [
    {
        path: 'banners',
        component: BannersPageComponent,
    },
];
