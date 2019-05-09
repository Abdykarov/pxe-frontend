import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
    {
        path: EMPTY,
        component: SignUpComponent,
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
export class SignUpRoutingModule { }
