import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicLayoutComponent } from './public-layout.component';
import {
    LoginType,
    LogoutType,
    SignType,
} from '../models/router-data.model';

const routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: '../../pages/landing/landing-page.module#LandingPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: 'login',
                loadChildren: '../../pages/login/login.module#LoginModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: 'logout',
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/securing-your-data/securing-your-data.module#SecuringYourDataModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: 'terms-of-use',
                loadChildren: '../../pages/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: 'sign-up',
                loadChildren: '../../pages/sign-up/sign-up.module#SignUpModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NAVIGATE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.NONE,
                },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PublicLayoutRoutingModule {}
