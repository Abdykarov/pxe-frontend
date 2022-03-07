import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { RequestsOverviewComponent } from './requests-overview.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: RequestsOverviewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequestsOverviewRoutingModule {}
