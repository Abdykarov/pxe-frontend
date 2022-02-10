import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { RefreshTokenResolver } from 'src/common/resolvers/refresh-token.resolver';
import { CreateUserComponent } from './create-user.component';
import { PricesComponent } from './prices/prices.component';
import { RecapitulationComponent } from './recapitulation/recapitulation.component';
import { SupplyPointComponent } from './supply-point/supply-point.component';

const routes: Routes = [
    {
        path: '',
        component: CreateUserComponent,
        children: [
            {
                path: CONSTS.PATHS.SUPPLY_POINT,
                component: SupplyPointComponent,
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    step: ProgressStatus.SUPPLY_POINT,
                    title: 'Nové odběrné místo',
                },
            },
            {
                path: CONSTS.PATHS.RECAPITULATION,
                component: RecapitulationComponent,
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    step: ProgressStatus.PERSONAL_DATA,
                    title: 'Osobní údaje',
                },
            },
            {
                path: CONSTS.PATHS.PRICES,
                component: PricesComponent,
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
                data: {
                    step: ProgressStatus.PRICES,
                    title: 'Ceny',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateUserRoutingModule {}
