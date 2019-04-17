import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CookiesPageModule, cookiesPageRoutes } from 'src/static/pages/cookies/page.module';
import { HybridLayoutComponent } from './hybrid-layout.component';

const routes: Routes = [
    {
        path: '',
        component: HybridLayoutComponent,
        children: [
            ...cookiesPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        CookiesPageModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class HybridLayoutRoutingModule {}
