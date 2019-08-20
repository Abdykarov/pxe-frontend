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

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RequestComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                redirectTo: CONSTS.PATHS.SUPPLY_POINT,
                pathMatch: 'full',
            },
            {
                path: CONSTS.PATHS.CONTRACT,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: '../../pages/request/contract/contract.module#ContractModule',
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT,
                loadChildren: '../../pages/request/supply-point/supply-point.module#SupplyPointModule',
            },
            {
                path: CONSTS.PATHS.OFFER_SELECTION,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: '../../pages/request/offer-selection/offer-selection.module#OfferSelectionModule',
            },
            {
                path: CONSTS.PATHS.RECAPITULATION,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: '../../pages/request/recapitulation/recapitulation.module#RecapitulationModule',
            },
            {
                path: CONSTS.PATHS.PAYMENT,
                canActivateChild: [
                    SupplyPointDetailGuard,
                ],
                loadChildren: '../../pages/request/payment/payment.module#PaymentModule',
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
