import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { LandingComponent } from './landing.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: LandingComponent,
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
export class LandingRoutingModule {}
