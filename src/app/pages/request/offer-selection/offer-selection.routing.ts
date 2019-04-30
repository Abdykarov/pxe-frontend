import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { OfferSelectionComponent } from './offer-selection.component';

const routes: Routes = [
    {
        path: '',
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
