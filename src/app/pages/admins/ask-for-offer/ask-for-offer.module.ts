import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AskForOfferRoutingModule } from './ask-for-offer-routing.module';
import { AskForOfferComponent } from './ask-for-offer.component';

@NgModule({
    declarations: [
        AskForOfferComponent,
    ],
    imports: [
        CommonModule,
        AskForOfferRoutingModule,
    ],
})
export class AskForOfferModule { }
