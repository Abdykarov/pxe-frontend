import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';

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
        CarouselModule.forRoot(),
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
