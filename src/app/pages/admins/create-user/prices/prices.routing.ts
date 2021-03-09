import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { PricesComponent } from './prices.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: PricesComponent,
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
export class PricesRoutingModule {
    constructor() {
        console.log('RecapitulationRoutingModule IS LOEADED');
    }
}
