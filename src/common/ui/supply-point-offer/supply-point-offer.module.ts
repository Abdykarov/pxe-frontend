import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionBenefitModule } from 'src/common/ui/accordion-benefit/accordion-benefit.module';
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
        AccordionBenefitModule,
        ButtonModule,
        CommonModule,
        IndicatorModule,
        PipesModule,
    ],
})
export class SupplyPointOfferModule {}
