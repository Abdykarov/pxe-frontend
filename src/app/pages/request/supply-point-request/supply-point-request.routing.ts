import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { SupplyPointRequestComponent } from './supply-point-request.component';

const routes: Routes = [
    {
        path: EMPTY,
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
