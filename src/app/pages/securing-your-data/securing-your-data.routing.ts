import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { SecuringYourDataComponent } from './securing-your-data.component';

const routes: Routes = [
    {
        path: EMPTY,
        component: SecuringYourDataComponent,
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
export class SecuringYourDataRoutingModule {}
