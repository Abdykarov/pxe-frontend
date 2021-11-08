import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { Error500PageComponent } from './page';

@NgModule({
    declarations: [Error500PageComponent],
    exports: [Error500PageComponent],
    imports: [ButtonModule, BreadcrumbModule, CommonModule, InfoBannerModule],
})
export class Error500PageModule {}

export const error500PageRoutes: Routes = [
    {
        path: 'error-500',
        component: Error500PageComponent,
        data: {
            isPublic: true,
            isPublicEmptyPage: true,
            isLandingPage: false,
            isSimpleFooter: false,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
