import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { HistoryDetailComponent } from './history-detail.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: HistoryDetailComponent,
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
export class HistoryDetailRouting { }
