import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { DeleteAccountComponent } from 'src/app/pages/delete-account/delete-account.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: DeleteAccountComponent,
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
export class DeleteAccountRoutingModule { }
