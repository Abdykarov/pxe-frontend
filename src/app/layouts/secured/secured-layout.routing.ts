import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import {
    LoginType,
    SignType,
} from '../models/router-data.model';
import { SecuredLayoutComponent } from './secured-layout.component';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SecuredLayoutComponent,
        children: [
            {
                path: CONSTS.PATHS.DASHBOARD,
                loadChildren: '../../pages/dashboard/dashboard.module#DashboardModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.REQUEST,
                loadChildren: '../../pages/request/request.module#RequestModule',
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
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT_SELECTION,
                loadChildren: '../../pages/supply-point-selection/supply-point-selection.module#SupplyPointSelectionModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
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
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.USER_PROFILE,
                loadChildren: '../../pages/user-profile/user-profile.module#UserProfileModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.DELETE_ACCOUNT,
                loadChildren: '../../pages/delete-account/delete-account.module#DeleteAccountModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    isSupplier: false,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.CHANGE_PASSWORD,
                loadChildren: '../../pages/user-change-password/user-change-password.module#UserChangePasswordModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
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
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
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
                path: CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS,
                redirectTo: CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS + '/',
            },
            {
                path: CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS + '/:commodityType',
                loadChildren:
                    '../../pages/supplier-concluded-contracts/supplier-concluded-contracts.module#SupplierConcludedContractsModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
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
