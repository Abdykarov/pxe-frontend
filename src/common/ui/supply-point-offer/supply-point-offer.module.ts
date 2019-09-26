import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { SupplyPointOfferComponent } from './supply-point-offer.component';

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
