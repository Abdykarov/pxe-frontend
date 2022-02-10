import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { UploadComponent } from 'src/app/pages/suppliers/import/upload/upload.component';
import { RefreshTokenResolver } from 'src/common/resolvers/refresh-token.resolver';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: UploadComponent,
        resolve: {
            refreshToken: RefreshTokenResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UploadRoutingModule {}
