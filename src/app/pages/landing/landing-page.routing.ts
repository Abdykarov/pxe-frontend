import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { LandingPageComponent } from './landing-page.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: LandingPageComponent,
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
export class LandingPageRoutingModule {}
