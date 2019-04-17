import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: 'basic',
        loadChildren: './layouts/basic/basic-layout.module#BasicLayoutModule',
    },
    {
        path: 'full',
        loadChildren: './layouts/full/full-layout.module#FullLayoutModule',
    },
    {
        path: 'hybrid',
        loadChildren: './layouts/hybrid/hybrid-layout.module#HybridLayoutModule',
    },
    {
        path: '**',
        redirectTo: '/basic',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                enableTracing: !environment.production,
                scrollPositionRestoration: 'top',
            },
        ),
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
