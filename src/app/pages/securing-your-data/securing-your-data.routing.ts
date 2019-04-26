import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { SecuringYourDataComponent } from './securing-your-data.component';

const routes: Routes = [
    {
        path: '',
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
