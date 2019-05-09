import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { TermsOfUseComponent } from './terms-of-use.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: TermsOfUseComponent,
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
export class TermsOfUseRoutingModule {}
