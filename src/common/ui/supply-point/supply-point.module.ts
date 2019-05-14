import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { IndicatorModule } from '../indicator/indicator.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { SupplyPointComponent } from './supply-point.component';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    exports: [
        SupplyPointComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        IndicatorModule,
        PipesModule,
    ],
})
export class SupplyPointModule {}
