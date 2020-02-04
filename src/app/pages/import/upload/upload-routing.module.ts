import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { UploadComponent } from 'src/app/pages/import/upload/upload.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: UploadComponent,
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
