import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { SupplyPointFormComponent } from './supply-point-form.component';

@NgModule({
    declarations: [
        SupplyPointFormComponent,
    ],
    imports: [
        AddressWhispererModule,
        AlertModule,
        ButtonModule,
        CommonModule,
        DirectivesModule,
        DatepickerModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        PipesModule,
        PlaceloaderModule,
        ReactiveFormsModule,
        SelectModule,
    ],
    exports: [
        SupplyPointFormComponent,
    ],
})
export class SupplyPointFormModule {}
