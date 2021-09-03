import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { CreateUserComponent } from './create-user.component';
import { PricesComponent } from './prices/prices.component';
import { SupplyPointComponent } from './supply-point/supply-point.component';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { RecapitulationComponent } from './recapitulation/recapitulation.component';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

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
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CreateUserRoutingModule { }
