import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ChangePasswordBannerPageComponent } from './page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';

@NgModule({
    declarations: [
        ChangePasswordBannerPageComponent,
    ],
    exports: [
        ChangePasswordBannerPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
    ],
})
export class ChangePasswordBannerPageModule {}

export const changePasswordBannerPageRoutes: Routes = [
    {
        path: 'change-password-banner',
        component: ChangePasswordBannerPageComponent,
    },
];
