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
                path: 'prague-stock-exchange',
                loadChildren: '../../pages/prague-exchange/prague-exchange.module#PragueExchangeModule',
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/securing-your-data/securing-your-data.module#SecuringYourDataModule',
            },
            {
                path: 'cookies-policy',
                loadChildren: '../../pages/cookies-policy/cookies-policy.module#CookiesPolicyModule',
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
