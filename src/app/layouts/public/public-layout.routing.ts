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
                loadChildren: '../../pages/public/landing/landing-page.module#LandingPageModule',
                data: {
                    isSimpleFooter: true,
                },
            },
            {
                path: 'login',
                loadChildren: '../../pages/public/login/login-page.module#LoginPageModule',
                data: {
                    isSimpleFooter: true,
                },
            },
            {
                path: 'logout',
                loadChildren: '../../pages/public/logout/logout-page.module#LogoutPageModule',
                data: {
                    isSimpleFooter: true,
                },
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/public/footer/securing-your-data/securing-your-data.module#SecuringYourDataModule',
                data: {
                    isSimpleFooter: true,
                },
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/public/footer/cookies-policy/cookies-policy.module#CookiesPolicyModule',
                data: {
                    isSimpleFooter: true,
                },
            },
            {
                path: 'terms-of-use',
                loadChildren: '../../pages/public/footer/terms-of-use/terms-of-use.module#TermsOfUseModule',
                data: {
                    isSimpleFooter: true,
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
