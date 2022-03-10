import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: DashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
