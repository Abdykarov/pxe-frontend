import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { SupplyPointComponent } from './supply-point.component';

@NgModule({
    declarations: [SupplyPointComponent],
    exports: [SupplyPointComponent],
    imports: [ButtonModule, CommonModule, IndicatorModule, PipesModule],
})
export class SupplyPointModule {}
