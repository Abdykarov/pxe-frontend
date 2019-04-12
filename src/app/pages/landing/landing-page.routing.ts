import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';

const routes = [
    {
        path: '',
        component: LandingPageComponent,
        data: {
            isHomePage: true,
        },
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
export class LandingPageRoutingModule { }
