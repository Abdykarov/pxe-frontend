import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressPriceOfPowerComponent } from 'src/common/containers/progress-price-of-power/progress-price-of-power.component';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { GraphsModule } from 'src/common/ui/graphs/graphs.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';


@NgModule({
    declarations: [
        ProgressPriceOfPowerComponent,
    ],
    exports: [
        ProgressPriceOfPowerComponent,
    ],
    imports: [
        CommonModule,
        IndicatorModule,
        GraphsModule,
        SupplierModule,
    ],
})
export class ProgressPriceOfPowerModule {}
