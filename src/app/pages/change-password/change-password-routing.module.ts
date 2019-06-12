import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ChangePasswordComponent,
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
export class ChangePasswordRoutingModule { }
