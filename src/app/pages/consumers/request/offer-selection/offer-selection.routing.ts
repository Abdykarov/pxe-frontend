import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { OfferSelectionComponent } from './offer-selection.component';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        component: OfferSelectionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OfferSelectionRoutingModule {}
