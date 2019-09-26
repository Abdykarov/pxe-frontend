import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { SupplyPointsComponent } from './supply-points.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplyPointsComponent,
    },
    {
        path: ':supplyPointId',
        loadChildren: '../../pages/supply-points/detail/supply-point-detail.module#SupplyPointDetailModule',
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
export class SupplyPointsRoutingModule {}