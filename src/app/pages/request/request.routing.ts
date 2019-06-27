import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    CONSTS,
} from 'src/app/app.constants';
import { RequestComponent } from './request.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RequestComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                loadChildren: '../../pages/request/overview/overview.module#OverviewModule',
            },
            {
                path: CONSTS.PATHS.CONTRACT,
                loadChildren: '../../pages/request/contract/contract.module#ContractModule',
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT,
                loadChildren: '../../pages/request/supply-point/supply-point.module#SupplyPointModule',
            },
            {
                path: CONSTS.PATHS.OFFER_SELECTION,
                loadChildren: '../../pages/request/offer-selection/offer-selection.module#OfferSelectionModule',
            },
            {
                path: CONSTS.PATHS.RECAPITULATION,
                loadChildren: '../../pages/request/recapitulation/recapitulation.module#RecapitulationModule',
            },
            {
                path: CONSTS.PATHS.PAYMENT,
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
