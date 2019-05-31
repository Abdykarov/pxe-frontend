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
