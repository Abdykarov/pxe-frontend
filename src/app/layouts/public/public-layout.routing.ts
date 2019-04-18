import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicLayoutComponent } from './public-layout.component';
import {
    LoginType,
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
                    signInType: SignType.SCROLL,
                },
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/footer/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signInType: SignType.NAVIGATE,
                },
            },
            {
                path: 'login',
                loadChildren: '../../pages/login/login-page.module#LoginPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signInType: SignType.NAVIGATE,
                },
            },
            {
                path: 'logout',
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signInType: SignType.NONE,
                },
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/footer/securing-your-data/securing-your-data.module#SecuringYourDataModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signInType: SignType.NAVIGATE,
                },
            },
            {
                path: 'terms-of-use',
                loadChildren: '../../pages/footer/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NONE,
                    signInType: SignType.NAVIGATE,
                },
            },
            {
                path: 'sign-in',
                loadChildren: '../../pages/sign-in/sign-in.module#SignInModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    loginType: LoginType.NAVIGATE,
                    signInType: SignType.NONE,
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
