import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import {
    EMPTY,
    OFFER_SELECTION,
    SUPPLY_POINT_REQUEST,
} from 'src/app/routes/paths';
import { RequestComponent } from './request.component';

const routes: Routes = [
    {
        path: EMPTY,
        component: RequestComponent,
        children: [
            {
                path: SUPPLY_POINT_REQUEST,
                loadChildren: '../../pages/request/supply-point-request/supply-point-request.module#SupplyPointRequestModule',
            },
            {
                path: OFFER_SELECTION,
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
