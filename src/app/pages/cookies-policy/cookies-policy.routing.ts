import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CookiesPolicyComponent } from './cookies-policy.component';
import { EMPTY } from 'src/app/routes/paths';

const routes: Routes = [
    {
        path: EMPTY,
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
