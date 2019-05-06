import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { NewSupplyPointComponent } from './new-supply-point.component';

const routes: Routes = [
    {
        path: '',
        component: NewSupplyPointComponent,
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
