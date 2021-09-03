import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { RouterModule } from '@angular/router';
import { SupplyPointOfferComponent } from './supply-point-offer.component';
import { TooltipModule } from '../tooltip/tooltip.module';

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
        RouterModule,
        TooltipModule,
    ],
})
export class SupplyPointOfferModule {}
