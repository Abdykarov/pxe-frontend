import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { SupplyPointsComponent } from './supply-points.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: SupplyPointsComponent,
    },
    {
        path: ':supplyPointId/:contractId',
        loadChildren: () =>
            import('./detail/supply-point-detail.module').then(
                (m) => m.SupplyPointDetailModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupplyPointsRoutingModule {}
