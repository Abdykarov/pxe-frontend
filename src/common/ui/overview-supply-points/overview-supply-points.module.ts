import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverviewSupplyPointsComponent } from './overview-supply-points.component';
import { SupplyPointModule } from '../supply-point/supply-point.module';

@NgModule({
    declarations: [
        OverviewSupplyPointsComponent,
    ],
    exports: [
        OverviewSupplyPointsComponent,
    ],
    imports: [
        CommonModule,
        SupplyPointModule,
    ],
})
export class OverviewSupplyPointsModule { }
