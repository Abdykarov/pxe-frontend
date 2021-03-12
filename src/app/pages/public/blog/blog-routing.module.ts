import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { BlogComponent } from './blog.component';
import { CONSTS } from 'src/app/app.constants';

const routes: Routes = [    {
    path: CONSTS.PATHS.EMPTY,
    component: BlogComponent,
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
export class BlogRoutingModule { }
