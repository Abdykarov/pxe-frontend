import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicLayoutComponent } from './public-layout.component';

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
                    showLogin: false,
                    showSignIn: true,
                },
            },
            {
                path: 'login',
                loadChildren: '../../pages/login/login-page.module#LoginPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: false,
                    showSignIn: true,
                },
            },
            {
                path: 'logout',
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: false,
                    showSignIn: false,
                },
            },
            {
                path: 'sign-in',
                loadChildren: '../../pages/sign-in/sign-in-page.module#SignInPageModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: true,
                    showSignIn: false,
                },
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/footer/securing-your-data/securing-your-data.module#SecuringYourDataModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: false,
                    showSignIn: true,
                },
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/footer/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: false,
                    showSignIn: true,
                },
            },
            {
                path: 'terms-of-use',
                loadChildren: '../../pages/footer/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isPublic: true,
                    isSimpleFooter: true,
                    showLogin: false,
                    showSignIn: true,
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
