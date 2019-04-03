import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { FullLayoutComponent } from './full-layout.component';
// import { LayoutPageModule, layoutPageRoutes } from 'src/static/pages/layout/page.module';
import { LandingModule, landingPageRoutes } from 'src/static/pages/landing/landing.module';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            // ...layoutPageRoutes,
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
        // LayoutPageModule,
        LandingModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FullLayoutRoutingModule {}
