import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { DetailComponent } from 'src/app/pages/consumers/supply-points-overview/detail/detail.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: DetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailRouting {}
