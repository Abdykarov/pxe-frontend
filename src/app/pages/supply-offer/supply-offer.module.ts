import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyOfferComponent } from './supply-offer.component';
import { SupplyOfferRoutingModule } from './supply-offer-routing.module';

@NgModule({
    declarations: [
        SupplyOfferComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SupplyOfferRoutingModule,
    ],
})
export class SupplyOfferModule { }
