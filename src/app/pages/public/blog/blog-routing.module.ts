import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { BlogComponent } from './blog.component';
import { CONSTS } from 'src/app/app.constants';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{
    path: CONSTS.PATHS.EMPTY,
    component: BlogComponent,
    children: [
        {
            path: ':type',
            component: OverviewComponent,
        },
        {
            path: ':type/:article',
            component: DetailComponent,
        },
        {
            path: CONSTS.PATHS.EMPTY,
            redirectTo: 'vse',
        },
    ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BlogRoutingModule { }
