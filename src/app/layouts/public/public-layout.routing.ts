import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    COOKIES_POLICY,
    EMPTY,
    LOGIN,
    LOGOUT,
    SECURING_YOUR_DATA,
    SIGN_UP,
    TERMS_OF_USE } from 'src/app/routes/paths';
import { PublicLayoutComponent } from './public-layout.component';
import {
    LoginType,
    LogoutType,
    SignType,
} from '../models/router-data.model';

const routes = [
    {
        path: EMPTY,
        component: PublicLayoutComponent,
        children: [
            {
                path: EMPTY,
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
                path: COOKIES_POLICY,
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
                path: LOGIN,
                loadChildren: '../../pages/login/login.module#LoginModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    logoutType: LogoutType.NONE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: LOGOUT,
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
                path: SECURING_YOUR_DATA,
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
                path: TERMS_OF_USE,
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
                path: SIGN_UP,
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
