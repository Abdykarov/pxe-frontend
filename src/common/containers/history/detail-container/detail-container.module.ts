import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DetailContainerComponent } from './detail-container.component';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import {BannerUIModule} from '../../../ui/banner/banner-ui.module';

@NgModule({
    declarations: [
        DetailContainerComponent,
    ],
    exports: [
        DetailContainerComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        PlaceloaderModule,
        SupplyPointDetailFormModule,
        BannerUIModule,
    ],
})
export class DetailContainerModule {}
