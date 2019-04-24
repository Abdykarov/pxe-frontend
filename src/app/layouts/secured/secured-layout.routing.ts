import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecuredLayoutComponent } from './secured-layout.component';

const routes = [
    {
        path: '',
        component: SecuredLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: '../../pages/dashboard/dashboard.module#DashboardModule',
                data: {
                    isSimpleFooter: false,
                },
            },
            {
                path: 'request',
                loadChildren: '../../pages/request/request.module#RequestModule',
                data: {
                    isSimpleFooter: false,
                },
            },
            {
                path: 'supply-point',
                loadChildren: '../../pages/supply-point/supply-point.module#SupplyPointModule',
                data: {
                    isSimpleFooter: false,
                },
            },
            {
                path: '',
                redirectTo: 'dashboard',
            },
            {
                path: '404',
                loadChildren: '../../pages/not-found/not-found.module#NotFoundModule',
                data: {
                    isSimpleFooter: false,
                },
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
