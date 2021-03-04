import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { ApprovalComponent } from 'src/app/pages/suppliers/import/approval/approval.component';
import { CONSTS } from 'src/app/app.constants';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ApprovalComponent,
        resolve: {
            refreshToken: RefreshTokenResolver,
        },
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
export class ApprovalRoutingModule { }
