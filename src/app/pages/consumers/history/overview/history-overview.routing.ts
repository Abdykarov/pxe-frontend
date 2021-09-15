import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { HistoryOverviewComponent } from './history-overview.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: HistoryOverviewComponent,
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
export class HistoryOverviewRouting { }
