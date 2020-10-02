import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';

const routes: Routes = [
    {
        path: 'basic',
        loadChildren: () => import('./layouts/basic/basic-layout.module').then(m => m.BasicLayoutModule),
    },
    {
        path: 'full',
        loadChildren: () => import('./layouts/full/full-layout.module').then(m => m.FullLayoutModule),
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
                enableTracing: false,
                scrollPositionRestoration: 'top',
            },
        ),
        CarouselModule.forRoot(),
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
