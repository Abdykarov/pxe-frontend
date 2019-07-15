import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { NewSupplyPointRoutingModule } from './supply-point-detail.routing';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import { SupplyPointDetailComponent } from './supply-point-detail.component';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';

@NgModule({
    declarations: [
        SupplyPointDetailComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        NewSupplyPointRoutingModule,
        PipesModule,
        PlaceloaderModule,
        ReactiveFormsModule,
        SupplyPointDetailFormModule,
        VerificationFormModule,
    ],
})
export class SupplyPointDetailModule {}
