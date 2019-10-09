import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { Error404PageComponent } from './page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';

@NgModule({
    declarations: [
        Error404PageComponent,
    ],
    exports: [
        Error404PageComponent,
    ],
    imports: [
        CommonModule,
        InfoBannerModule,
    ],
})
export class Error404PageModule {}

export const error404PageRoutes: Routes = [
    {
        path: 'error-404',
        component: Error404PageComponent,
        data: {
            isPublic: true,
            isPublicEmptyPage: true,
            isLandingPage: false,
            isSimpleFooter: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
