import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AskForOfferResolver } from 'src/app/resolvers/ask-for-offer.resolver';
import { CONSTS } from 'src/app/app.constants';
import { CookiePolicyResolver } from 'src/app/resolvers/cookie-policy.resolver';
import { FaqResolver } from 'src/app/resolvers/faq.resolver';
import { LandingPageResolver } from 'src/app/resolvers/landing-page.resolver';
import { LoginResolver } from 'src/app/resolvers/login.resolver';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { PatternsOfContractsResolver } from 'src/app/resolvers/patterns-of-contracts.resolver';
import { PublicLayoutComponent } from './public-layout.component';
import { SecuringYourDataResolver } from 'src/app/resolvers/securing-your-data.resolver';
import { SignUpResolver } from 'src/app/resolvers/sign-up.resolver';
import { TermsOfUseResolver } from 'src/app/resolvers/terms-of-use.resolver';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: PublicLayoutComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                loadChildren: () => import('../../pages/landing/landing.module').then(m => m.LandingModule),
                resolve: {
                    askForOffer: AskForOfferResolver,
                    landingPage: LandingPageResolver,
                    signUp: SignUpResolver,
                },
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
                loadChildren: () => import('../../pages/cookies-policy/cookies-policy.module').then(m => m.CookiesPolicyModule),
                resolve: {
                    cookiePolicy: CookiePolicyResolver,
                },
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.DELETED_ACCOUNT,
                loadChildren: () => import('../../pages/deleted-account/deleted-account.module').then(m => m.DeletedAccountModule),
                data: {
                    isPublic: true,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.FAQ,
                loadChildren: () => import('../../pages/faq/faq.module').then(m => m.FaqModule),
                resolve: {
                    faq: FaqResolver,
                },
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.LOGIN,
                loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule),
                resolve: {
                    login: LoginResolver,
                },
                data: {
                    isPublic: true,
                    loginType: LoginType.RELOAD,
                    signUpType: SignType.NAVIGATE,
                },
            },
            {
                path: CONSTS.PATHS.LOGOUT,
                loadChildren: () => import('../../pages/logout/logout-page.module').then(m => m.LogoutPageModule),
                data: {
                    isPublic: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SECURING_YOUR_DATA,
                loadChildren: () => import('../../pages/securing-your-data/securing-your-data.module').then(m => m.SecuringYourDataModule),
                resolve: {
                    securingYourData: SecuringYourDataResolver,
                },
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.TERMS_OF_USE,
                loadChildren: () => import('../../pages/terms-of-use/terms-of-use.module').then(m => m.TermsOfUseModule),
                resolve: {
                    termsOfUse: TermsOfUseResolver,
                },
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
                path: CONSTS.PATHS.PATTERNS_OF_CONTRACTS + '/:subjectType',
                loadChildren: () => import('../../pages/patterns-of-contracts/patterns-of-contracts.module').then(
                    m => m.PatternsOfContractsModule,
                ),
                resolve: {
                    patternsOfContracts: PatternsOfContractsResolver,
                },
                data: {
                    isPublic: true,
                    isSimpleFooter: false,
                    loginType: LoginType.NAVIGATE,
                    signUpType: SignType.SCROLL,
                },
            },
            {
                path: CONSTS.PATHS.SIGN_UP,
                loadChildren: () => import('../../pages/sign-up/sign-up.module').then(m => m.SignUpModule),
                resolve: {
                    signUp: SignUpResolver,
                },
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
