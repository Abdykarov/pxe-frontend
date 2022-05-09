import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { NotFoundComponent } from './not-found.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotFoundRoutingModule {}
