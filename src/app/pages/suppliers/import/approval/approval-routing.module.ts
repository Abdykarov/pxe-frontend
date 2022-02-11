import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { ApprovalComponent } from 'src/app/pages/suppliers/import/approval/approval.component';
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
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApprovalRoutingModule {}
