import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecuredLayoutComponent } from './secured-layout.component';

const routes = [
    {
        path: '',
        component: SecuredLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: '../../pages/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'basket',
                loadChildren: '../../pages/basket/basket.module#BasketModule',
            },
            {
                path: '404',
                loadChildren: '../../pages/not-found/not-found.module#NotFoundModule',
            },
            {
                path: '**',
                redirectTo: '404',
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
export class SecuredLayoutRoutingModule { }
