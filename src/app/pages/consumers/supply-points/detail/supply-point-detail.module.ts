import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointDetailComponent } from './supply-point-detail.component';
import { NewSupplyPointRoutingModule } from './supply-point-detail.routing';

@NgModule({
    declarations: [SupplyPointDetailComponent],
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
