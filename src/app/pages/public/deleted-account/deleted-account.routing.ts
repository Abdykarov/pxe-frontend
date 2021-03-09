import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { DeletedAccountComponent } from './deleted-account.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: DeletedAccountComponent,
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
export class DeletedAccountRoutingModule {}
