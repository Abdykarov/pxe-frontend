import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { SupplyPointSelectionComponent } from './supply-point-selection.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplyPointSelectionComponent,
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
export class SupplyPointSelectionRoutingModule { }
