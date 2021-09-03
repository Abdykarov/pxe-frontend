import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { OAuthLayoutComponent } from './o-auth-layout.component';

const routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: OAuthLayoutComponent,
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
export class OAuthRoutingLayoutModule {}
