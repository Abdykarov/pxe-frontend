import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { SupplierConcludedContractsComponent } from 'src/app/pages/supplier-concluded-contracts/supplier-concluded-contracts.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplierConcludedContractsComponent,
    },
    {
        path: CONSTS.PATHS.WILD_CART,
        component: SupplierConcludedContractsComponent,
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
export class SupplierConcludedContractsRoutingModule {}
