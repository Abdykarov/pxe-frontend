import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressPriceOfPowerComponent } from 'src/common/containers/progress-price-of-power/progress-price-of-power.component';
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
        SupplierModule,
    ],
})
export class ProgressPriceOfPowerModule {}
