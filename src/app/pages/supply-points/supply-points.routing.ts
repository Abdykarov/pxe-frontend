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
