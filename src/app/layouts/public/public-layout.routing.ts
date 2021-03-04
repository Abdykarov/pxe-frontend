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
                loadChildren: () => import('../../pages/public/landing/landing.module').then(m => m.LandingModule),
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
                loadChildren: () => import('../../pages/public/cookies-policy/cookies-policy.module').then(m => m.CookiesPolicyModule),
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.DELETED_ACCOUNT,
                loadChildren: () => import('../../pages/public/deleted-account/deleted-account.module').then(m => m.DeletedAccountModule),
                data: {
                    isPublic: true,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.FAQ,
                loadChildren: () => import('../../pages/public/faq/faq.module').then(m => m.FaqModule),
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.LOGIN,
                loadChildren: () => import('../../pages/public/login/login.module').then(m => m.LoginModule),
                data: {
                    isPublic: true,
                    loginType: LoginType.RELOAD,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.LOGOUT,
                loadChildren: () => import('../../pages/public/logout/logout-page.module').then(m => m.LogoutPageModule),
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SECURING_YOUR_DATA,
                loadChildren: () => import('../../pages/public/securing-your-data/securing-your-data.module')
                    .then(m => m.SecuringYourDataModule),
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.TERMS_OF_USE,
                loadChildren: () => import('../../pages/public/terms-of-use/terms-of-use.module').then(m => m.TermsOfUseModule),
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
                loadChildren: () => import('../../pages/public/patterns-of-contracts/patterns-of-contracts.module').then(
                    m => m.PatternsOfContractsModule,
                ),
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.SIGN_UP,
                loadChildren: () => import('../../pages/public/sign-up/sign-up.module').then(m => m.SignUpModule),
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
