import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { FaqOverviewComponent } from 'src/app/pages/faq/faq-overview/faq-overview.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: FaqOverviewComponent,
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
export class FaqOverviewRoutingModule { }
