import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { IndicatorModule } from '../indicator/indicator.module';
import { SupplyPointOfferComponent } from './supply-point-offer.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        SupplyPointOfferComponent,
    ],
    exports: [
        SupplyPointOfferComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        IndicatorModule,
        PipesModule,
    ],
})
export class SupplyPointOfferModule {}
