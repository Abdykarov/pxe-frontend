import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { Error503PageComponent } from './page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';

@NgModule({
    declarations: [
        Error503PageComponent,
    ],
    exports: [
        Error503PageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        InfoBannerModule,
    ],
})
export class Error503PageModule {}

export const error503PageRoutes: Routes = [
    {
        path: 'error-503',
        component: Error503PageComponent,
    },
];
