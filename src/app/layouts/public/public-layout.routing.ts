import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import {
    LoginType,
    SignType,
} from '../models/router-data.model';
import { PublicLayoutComponent } from './public-layout.component';

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
                    isLandingPage: true,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.COOKIES_POLICY,
                loadChildren: '../../pages/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.DELETED_ACCOUNT,
                loadChildren: '../../pages/deleted-account/deleted-account.module#DeletedAccountModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.FAQ,
                loadChildren: '../../pages/faq/faq.module#FaqModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.LOGIN,
                loadChildren: '../../pages/login/login.module#LoginModule',
                data: {
                    isPublic: true,
                    loginType: LoginType.RELOAD,
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
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.TERMS_OF_USE,
                loadChildren: '../../pages/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.PATTERNS_OF_CONTRACTS,
                redirectTo: CONSTS.PATHS.PATTERNS_OF_CONTRACTS + '/',
            },
            {
                path: CONSTS.PATHS.PATTERNS_OF_CONTRACTS + '/:subjectType/:commodityType',
                loadChildren: '../../pages/patterns-of-contracts/patterns-of-contracts.module#PatternsOfContractsModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
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
