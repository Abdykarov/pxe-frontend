import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {
        path: EMPTY,
        component: LoginComponent,
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
export class LoginRoutingModule {}
