import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { Error503PageComponent } from './page';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@NgModule({
    declarations: [
        Error503PageComponent,
    ],
    exports: [
        Error503PageComponent,
    ],
    imports: [
        CommonModule,
        InfoBannerModule,
    ],
})
export class Error503PageModule {}

export const error503PageRoutes: Routes = [
    {
        path: 'error-503',
        component: Error503PageComponent,
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
