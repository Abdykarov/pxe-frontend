import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { TermsOfUseComponent } from './terms-of-use.component';

const routes: Routes = [
    {
        path: EMPTY,
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
