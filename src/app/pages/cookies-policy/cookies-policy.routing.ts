import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { CookiesPolicyComponent } from './cookies-policy.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: CookiesPolicyComponent,
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
export class CookiesPolicyRoutingModule {}
