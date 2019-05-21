import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyOfferComponent } from './supply-offer.component';
import { SupplyOfferRoutingModule } from './supply-offer-routing.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        SupplyOfferComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SupplyOfferRoutingModule,
        TableModule,
        DropdownModule,
        ButtonModule,
    ],
})
export class SupplyOfferModule { }
