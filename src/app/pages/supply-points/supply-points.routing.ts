import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { SupplyPointsComponent } from './supply-points.component';

const routes: Routes = [
    {
        path: '',
        component: SupplyPointsComponent,
        children: [
            {
                path: 'new-supply-point',
                loadChildren: '../../pages/supply-points/new-supply-point/new-supply-point.module#NewSupplyPointModule',
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
export class SupplyPointsRoutingModule {}
