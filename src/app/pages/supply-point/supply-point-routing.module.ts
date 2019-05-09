import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { SupplyPointComponent } from './supply-point.component';

const routes: Routes = [
    {
        path: EMPTY,
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
export class SupplyPointRoutingModule { }
