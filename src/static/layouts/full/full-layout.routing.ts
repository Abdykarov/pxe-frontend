import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { FullLayoutComponent } from './full-layout.component';
import { LandingModule, landingPageRoutes } from 'src/static/pages/landing/landing.module';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            ...landingPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        LandingModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FullLayoutRoutingModule {}
