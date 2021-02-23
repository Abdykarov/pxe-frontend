import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AskForOfferRoutingModule } from './ask-for-offer-routing.module';
import { AskForOfferComponent } from './ask-for-offer.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        AskForOfferComponent,
    ],
    imports: [
        AskForOfferRoutingModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        TableModule,
    ],
})
export class AskForOfferModule { }
