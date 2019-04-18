import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { SupplyPointComponent } from './supply-point.component';


const routes: Routes = [
    {
        path: '',
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
