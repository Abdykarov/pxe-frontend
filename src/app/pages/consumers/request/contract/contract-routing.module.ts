import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { ContractComponent } from './contract.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ContractComponent,
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
export class ContractRoutingModule { }
