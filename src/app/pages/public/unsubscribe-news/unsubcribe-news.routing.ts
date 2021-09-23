import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { UnsubscribeNewsComponent } from './unsubscribe-news.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: UnsubscribeNewsComponent,
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
export class UnsubscribeRoutingModule {}
