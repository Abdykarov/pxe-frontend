import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { ApprovalComponent } from 'src/app/pages/import/approval/approval.component';
import { CONSTS } from 'src/app/app.constants';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ApprovalComponent,
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
