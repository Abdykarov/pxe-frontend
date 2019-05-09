import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { NotFoundComponent } from './not-found.component';

const routes = [
    {
        path: EMPTY,
        component: NotFoundComponent,
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
export class NotFoundRoutingModule { }
