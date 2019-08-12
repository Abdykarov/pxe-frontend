import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: UserProfileComponent,
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
export class UserProfileRouting { }
