import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointComponent } from './supply-point.component';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { SupplyPointRoutingModule } from './supply-point.routing';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    imports: [
        CommonModule,
        PlaceloaderModule,
        SupplyPointFormModule,
        SupplyPointRoutingModule,
    ],
})
export class SupplyPointModule {}
