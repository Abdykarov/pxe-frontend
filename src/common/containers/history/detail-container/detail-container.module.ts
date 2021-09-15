import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailContainerComponent } from './detail-container.component';
import {FormModule} from '../../../ui/forms/form.module';
import {AlertModule} from '../../../ui/alert/alert.module';
import {PlaceloaderModule} from '../../../ui/placeloader/placeloader.module';
import {SupplyPointDetailFormModule} from '../../form/forms/supply-point/detail/supply-point-detail-form.module';
import {ButtonModule} from '../../../ui/button/button.module';

@NgModule({
    declarations: [
        DetailContainerComponent,
    ],
    exports: [
        DetailContainerComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        AlertModule,
        PlaceloaderModule,
        SupplyPointDetailFormModule,
        ButtonModule,
    ],
})
export class DetailContainerModule { }
