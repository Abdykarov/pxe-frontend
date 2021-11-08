import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { DetailContainerComponent } from './detail-container.component';

@NgModule({
    declarations: [DetailContainerComponent],
    exports: [DetailContainerComponent],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        PlaceloaderModule,
        SupplyPointDetailFormModule,
    ],
})
export class DetailContainerModule {}
