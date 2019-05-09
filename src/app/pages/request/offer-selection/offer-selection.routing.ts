import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { EMPTY } from 'src/app/routes/paths';
import { OfferSelectionComponent } from './offer-selection.component';

const routes: Routes = [
    {
        path: EMPTY,
        component: OfferSelectionComponent,
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
export class OfferSelectionRoutingModule { }
