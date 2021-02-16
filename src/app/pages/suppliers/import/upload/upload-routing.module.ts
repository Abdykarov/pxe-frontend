import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';
import { UploadComponent } from 'src/app/pages/suppliers/import/upload/upload.component';

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
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UploadRoutingModule { }
