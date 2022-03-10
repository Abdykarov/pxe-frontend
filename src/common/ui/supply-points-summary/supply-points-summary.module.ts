import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { SupplyPointsSummaryComponent } from 'src/common/ui/supply-points-summary/supply-points-summary.component';

@NgModule({
    declarations: [SupplyPointsSummaryComponent],
    exports: [SupplyPointsSummaryComponent],
    imports: [ButtonModule, CommonModule, IndicatorModule, PipesModule],
})
export class SupplyPointsSummaryModule {}
