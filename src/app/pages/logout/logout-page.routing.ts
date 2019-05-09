import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { LogoutPageComponent } from './logout-page.component';

const routes = [
    {
        path: EMPTY,
        component: LogoutPageComponent,
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
export class LogoutPageRoutingModule { }
