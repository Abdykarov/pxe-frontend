import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { PragueExchangeComponent } from './prague-exchange.component';

const routes: Routes = [
    {
        path: '',
        component: PragueExchangeComponent,
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
export class PragueExchangeRoutingModule {}
