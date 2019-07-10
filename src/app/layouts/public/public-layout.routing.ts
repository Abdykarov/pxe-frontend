import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { PublicLayoutComponent } from './public-layout.component';
import {
    LoginType,
    SignType,
} from '../models/router-data.model';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: PublicLayoutComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                loadChildren: '../../pages/landing/landing.module#LandingModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.COOKIES_POLICY,
                loadChildren: '../../pages/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.LOGIN,
                loadChildren: '../../pages/login/login.module#LoginModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.LOGOUT,
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SECURING_YOUR_DATA,
                loadChildren: '../../pages/securing-your-data/securing-your-data.module#SecuringYourDataModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.TERMS_OF_USE,
                loadChildren: '../../pages/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.SIGN_UP,
                loadChildren: '../../pages/sign-up/sign-up.module#SignUpModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NAVIGATE,
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
