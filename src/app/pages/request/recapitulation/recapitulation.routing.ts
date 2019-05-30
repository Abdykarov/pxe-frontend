import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { RecapitulationComponent } from './recapitulation.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RecapitulationComponent,
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
export class RecapitulationRoutingModule {}
