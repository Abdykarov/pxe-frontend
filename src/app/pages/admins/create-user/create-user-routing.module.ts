import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CreateUserComponent } from './create-user.component';
import { CONSTS } from 'src/app/app.constants';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

const routes: Routes = [
    {
        path: '',
        component: CreateUserComponent,
        children: [
            {
                path: CONSTS.PATHS.PRICES,
                loadChildren: () => import('./prices/prices.module').then(m => m.PricesModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.SUPPLY_POINT,
                loadChildren: () => import('./supply-point/supply-point.module').then(m => m.SupplyPointModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
                },
            },
            {
                path: CONSTS.PATHS.RECAPITULATION,
                loadChildren: () => import('./recapitulation/recapitulation.module').then(m => m.RecapitulationModule),
                resolve: {
                    refreshToken: RefreshTokenResolver,
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
