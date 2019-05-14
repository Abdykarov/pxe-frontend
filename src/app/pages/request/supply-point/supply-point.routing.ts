import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { SupplyPointComponent } from './supply-point.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplyPointComponent,
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
export class NewSupplyPointRoutingModule {}
