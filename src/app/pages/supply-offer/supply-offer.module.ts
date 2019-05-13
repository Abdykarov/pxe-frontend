import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SupplyOfferComponent } from './supply-offer.component';
import { SupplyOfferRoutingModule } from './supply-offer-routing.module';

@NgModule({
    declarations: [
        SupplyOfferComponent,
    ],
    imports: [
        CommonModule,
        SupplyOfferRoutingModule,
    ],
})
export class SupplyOfferModule { }
