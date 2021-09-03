import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { IUserTypes } from 'src/app/services/model/auth.model';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SecuredLayoutComponent } from './secured-layout.component';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SecuredLayoutComponent,
        children: [
            {
                path: CONSTS.PATHS.DASHBOARD,
                loadChildren: () => import('../../pages/consumers/dashboard/dashboard.module').then(m => m.DashboardModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.REQUEST,
                loadChildren: () => import('../../pages/consumers/request/request.module').then(m => m.RequestModule),
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.REQUESTS,
                loadChildren: () => import('../../pages/consumers/requests-overview/requests-overview.module')
                    .then(m => m.RequestsOverviewModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT_SELECTION,
                loadChildren: () => import('../../pages/consumers/supply-point-selection/supply-point-selection.module').then(
                    m => m.SupplyPointSelectionModule,
                ),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.CREATE_USER,
                loadChildren: () => import('../../pages/admins/create-user/create-user.module').then(
                    m => m.CreateUserModule,
                ),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONTRACT_IMPORTER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINTS,
                loadChildren: () => import('../../pages/consumers/supply-points/supply-points.module').then(m => m.SupplyPointsModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.USER_PROFILE,
                loadChildren: () => import('../../pages/consumers/profile/profile.module').then(m => m.UserProfileModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLIER_PROFILE,
                loadChildren: () => import('../../pages/supplier-profile/supplier-profile.module').then(m => m.SupplierProfileModule),
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
                path: CONSTS.PATHS.DELETE_ACCOUNT,
                loadChildren: () => import('../../pages/consumers/delete-account/delete-account.module').then(m => m.DeleteAccountModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.IMPORT,
                loadChildren: () => import('../../pages/suppliers/import/import.module').then(m => m.ImportModule),
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.SUPPLIER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    hideLeftNavigation: true,
                },
            },
            {
                path: CONSTS.PATHS.CHANGE_PASSWORD,
                loadChildren: () => import('../../pages/consumers/change-password/change-password.module').then(
                    m => m.ChangePasswordModule,
                ),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONSUMER,
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
                loadChildren: () => import('../../pages/suppliers/supply-offer/supply-offer.module').then(m => m.SupplyOfferModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.SUPPLIER,
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
                    () => import('../../pages/suppliers/concluded-contracts/concluded-contracts.module').then(
                        m => m.ConcludedContractsModule,
                    ),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.SUPPLIER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                    hideLeftNavigation: true,
                },
            },
            {
                path: CONSTS.PATHS.ASK_FOR_OFFER + '/:type',
                loadChildren: () => import('../../pages/admins/ask-for-offer/ask-for-offer.module').then(m => m.AskForOfferModule),
                data: {
                    isSimpleFooter: false,
                    isPublic: false,
                    userType: IUserTypes.CONTRACT_IMPORTER,
                    loginType: LoginType.NONE,
                    signUpType: SignType.NONE,
                },
            },
            {
                path: CONSTS.PATHS.EMPTY,
                redirectTo: CONSTS.PATHS.DASHBOARD,
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
