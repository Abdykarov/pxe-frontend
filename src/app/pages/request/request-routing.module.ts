import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { RequestComponent } from './request.component';

const routes: Routes = [
    {
        path: '',
        component: RequestComponent,
        children: [
            {
                path: 'supply-point',
                loadChildren: '../../pages/request/supply-point-request/supply-point-request.module#SupplyPointRequestModule',
            },
            {
                path: 'offer-selection',
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
