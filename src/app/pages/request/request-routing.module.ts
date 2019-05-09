import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { RequestComponent } from './request.component';
import { EMPTY } from 'rxjs';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RequestComponent,
        children: [
            {
                path: CONSTS.PATHS.SUPPLY_POINT_REQUEST,
                loadChildren: '../../pages/request/supply-point-request/supply-point-request.module#SupplyPointRequestModule',
            },
            {
                path: CONSTS.PATHS.OFFER_SELECTION,
                loadChildren: '../../pages/request/offer-selection/offer-selection.module#OfferSelectionModule',
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
