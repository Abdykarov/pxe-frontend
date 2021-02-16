import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { ImportComponent } from 'src/app/pages/suppliers/import/import.component';

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
                loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
            },
            {
                path: CONSTS.PATHS.APPROVAL,
                redirectTo: CONSTS.PATHS.APPROVAL + '/',
            },
            {
                path: CONSTS.PATHS.APPROVAL + '/:commodityType',
                loadChildren: () => import('./approval/approval.module').then(m => m.ApprovalModule),
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
