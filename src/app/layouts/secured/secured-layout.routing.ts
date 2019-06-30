import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import {
    LoginType,
    SignType,
} from '../models/router-data.model';
import { SecuredLayoutComponent } from './secured-layout.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SecuredLayoutComponent,
        children: [
            {
                path: CONSTS.PATHS.DASHBOARD,
                loadChildren: '../../pages/dashboard/dashboard.module#DashboardModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.REQUESTS,
                loadChildren: '../../pages/requests-overview/requests-overview.module#RequestsOverviewModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINTS,
                loadChildren: '../../pages/supply-points/supply-points.module#SupplyPointsModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_OFFER,
                redirectTo: CONSTS.PATHS.SUPPLY_OFFER + '/',
            },
            {
                path: CONSTS.PATHS.SUPPLY_OFFER + '/:commodityType',
                loadChildren: '../../pages/supply-offer/supply-offer.module#SupplyOfferModule',
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: true,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    hideLeftNavigation: true,
                },
            },
            {
                path: CONSTS.PATHS.EMPTY,
                redirectTo: CONSTS.PATHS.DASHBOARD,
            },
            {
                path: CONSTS.PATHS.NOT_FOUND,
                loadChildren: '../../pages/not-found/not-found.module#NotFoundModule',
                data: {
                    isSimpleFooter: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.WILD_CART,
                redirectTo: CONSTS.PATHS.NOT_FOUND,
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
