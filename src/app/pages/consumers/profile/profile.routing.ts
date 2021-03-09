import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { ProfileComponent } from 'src/app/pages/consumers/profile/profile.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: ProfileComponent,
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
export class ProfileRouting { }
