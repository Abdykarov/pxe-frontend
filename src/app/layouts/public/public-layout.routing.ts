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
            },
            {
                path: 'logout',
                loadChildren: '../../pages/logout/logout-page.module#LogoutPageModule',
            },
            {
                path: 'prague-exchange',
                loadChildren: '../../pages/prague-exchange/prague-exchange.module#PragueExchangeModule',
            },
            {
                path: 'securing-your-data',
                loadChildren: '../../pages/securing-your-data/securing-your-data.module#SecuringYourDataModule',
            },
            {
                path: 'term-of-use',
                loadChildren: '../../pages/term-of-use/term-of-use.module#TermOfUseModule',
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
