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
                    isSimpleFooter: true,
                },
            },
            {
                path: 'login',
                loadChildren: '../../pages/login/login-page.module#LoginPageModule',
            },
            {
                path: 'logout',
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/footer/securing-your-data/securing-your-data.module#SecuringYourDataModule',
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/footer/cookies-policy/cookies-policy.module#CookiesPolicyModule',
            },
            {
                path: 'terms-of-use',
                loadChildren: '../../pages/footer/terms-of-use/terms-of-use.module#TermsOfUseModule',
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
export class PublicLayoutRoutingModule { }
