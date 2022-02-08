import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { ContractTypes } from 'src/common/containers/supply-points-overview/supply-points-overview-container.model';
import { SupplyPointsOverviewComponent } from './supply-points-overview.component';

const routes: Routes = [
    {
        path: ':type',
        component: SupplyPointsOverviewComponent,
    },
    {
        path: ':supplyPointId/:contractId',
        loadChildren: () =>
            import('./detail/detail.module').then((m) => m.DetailModule),
    },
    {
        path: CONSTS.PATHS.EMPTY,
        redirectTo: ContractTypes.ACTIVE,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupplyPointsOverviewRoutingModule {}
