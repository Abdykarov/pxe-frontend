import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SupplyPointOfferComponent } from './supply-point-offer.component';

@NgModule({
    declarations: [SupplyPointOfferComponent],
    exports: [SupplyPointOfferComponent],
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
