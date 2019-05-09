import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    EMPTY,
    DASHBOARD,
    ERROR_PAGE,
    REQUEST,
    SUPPLY_POINT,
    WILD_CART,
} from 'src/app/routes/paths';
import {
    LoginType,
    SignType,
} from '../models/router-data.model';
import { SecuredLayoutComponent } from './secured-layout.component';

const routes = [
    {
        path: EMPTY,
        component: SecuredLayoutComponent,
        children: [
            {
                path: DASHBOARD,
                loadChildren: '../../pages/dashboard/dashboard.module#DashboardModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    logoutType: LoginType.NAVIGATE,
                },
            },
            {
                path: REQUEST,
                loadChildren: '../../pages/request/request.module#RequestModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    logoutType: LoginType.NAVIGATE,
                },
            },
            {
                path: SUPPLY_POINT,
                loadChildren: '../../pages/supply-point/supply-point.module#SupplyPointModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    logoutType: LoginType.NAVIGATE,
                },
            },
            {
                path: EMPTY,
                redirectTo: DASHBOARD,
            },
            {
                path: ERROR_PAGE,
                loadChildren: '../../pages/not-found/not-found.module#NotFoundModule',
                data: {
                    isSimpleFooter: false,
                },
            },
            {
                path: WILD_CART,
                redirectTo: ERROR_PAGE,
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
