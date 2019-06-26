import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { NewSupplyPointRoutingModule } from './supply-point-detail.routing';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import { SupplyPointDetailComponent } from './supply-point-detail.component';

@NgModule({
    declarations: [
        SupplyPointDetailComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        NewSupplyPointRoutingModule,
        PlaceloaderModule,
        ReactiveFormsModule,
        SupplyPointDetailFormModule,
    ],
})
export class SupplyPointDetailModule {}
