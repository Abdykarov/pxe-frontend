import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { LandingPageComponent } from './landing-page.component';

const routes = [
    {
        path: EMPTY,
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
