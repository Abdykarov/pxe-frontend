import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { UserChangePasswordComponent } from 'src/app/pages/user-change-password/user-change-password.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: UserChangePasswordComponent,
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
export class UserChangePasswordRouting { }
