import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { SupplyPointRequestComponent } from './supply-point-request.component';

const routes: Routes = [
    {
        path: '',
        component: SupplyPointRequestComponent,
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
export class SupplyPointRequestRoutingModule { }
