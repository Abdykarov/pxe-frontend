import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { Error500PageComponent } from './page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';


@NgModule({
    declarations: [
        Error500PageComponent,
    ],
    exports: [
        Error500PageComponent,
    ],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        InfoBannerModule,
    ],
})
export class Error500PageModule {}

export const error500PageRoutes: Routes = [
    {
        path: 'error-500',
        component: Error500PageComponent,
    },
];
