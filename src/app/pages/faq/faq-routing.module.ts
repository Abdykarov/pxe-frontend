import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { FaqComponent } from 'src/app/pages/faq/faq.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: FaqComponent,
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
export class FaqRoutingModule { }
