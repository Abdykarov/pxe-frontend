import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { SupplyPointOverviewComponent } from './supply-point-overview.component';

@NgModule({
    declarations: [
        SupplyPointOverviewComponent,
    ],
    exports: [
        SupplyPointOverviewComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        IndicatorModule,
        PipesModule,
    ],
})
export class SupplyPointOverviewModule {}
