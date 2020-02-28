import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { ImportComponent } from 'src/app/pages/import/import.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ImportComponent,
        children: [
            {
                path: CONSTS.PATHS.EMPTY,
                redirectTo: CONSTS.PATHS.UPLOAD,
                pathMatch: 'full',
            },
            {
                path: CONSTS.PATHS.UPLOAD,
                loadChildren: '../../pages/import/upload/upload.module#UploadModule',
            },
            {
                path: CONSTS.PATHS.APPROVAL,
                redirectTo: CONSTS.PATHS.APPROVAL + '/',
            },
            {
                path: CONSTS.PATHS.APPROVAL + '/:commodityType',
                loadChildren: '../../pages/import/approval/approval.module#ApprovalModule',
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
export class ImportRoutingModule { }
