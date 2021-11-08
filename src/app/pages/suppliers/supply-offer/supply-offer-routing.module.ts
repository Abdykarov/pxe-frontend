import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplyOfferComponent } from './supply-offer.component';

const routes: Routes = [
    {
        path: '',
        component: SupplyOfferComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupplyOfferRoutingModule {}
