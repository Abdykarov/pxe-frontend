import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { BlogComponent } from './blog.component';
import { DetailComponent } from './detail/detail.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
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
                redirectTo: CONSTS.ALL_BLOG,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
