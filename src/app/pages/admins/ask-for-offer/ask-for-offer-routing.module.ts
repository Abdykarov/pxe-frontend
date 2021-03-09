import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { AskForOfferComponent } from './ask-for-offer.component';
import { CONSTS } from 'src/app/app.constants';

const routes: Routes = [    {
    path: '',
    component: AskForOfferComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AskForOfferRoutingModule { }
