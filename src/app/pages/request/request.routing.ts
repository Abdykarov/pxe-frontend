import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    CONSTS,
} from 'src/app/app.constants';
import { RequestComponent } from './request.component';
import { SupplyPointDetailGuard } from 'src/app/guards/supply-point-detail.guard';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RequestComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                redirectTo: CONSTS.PATHS.SIGNBOARD,
                pathMatch: 'full',
            },
            {
                path: CONSTS.PATHS.SIGNBOARD,
                loadChildren: '../../pages/request/signboard/signboard.module#SignboardModule',
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.CONTRACT,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: () => import('../../pages/request/contract/contract.module').then(m => m.ContractModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT,
                loadChildren: () => import('../../pages/request/supply-point/supply-point.module').then(m => m.SupplyPointModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.OFFER_SELECTION,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: () => import('../../pages/request/offer-selection/offer-selection.module').then(m => m.OfferSelectionModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.RECAPITULATION,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: () => import('../../pages/request/recapitulation/recapitulation.module').then(m => m.RecapitulationModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.PAYMENT,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: () => import('../../pages/request/payment/payment.module').then(m => m.PaymentModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
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
export class RequestRoutingModule { }
