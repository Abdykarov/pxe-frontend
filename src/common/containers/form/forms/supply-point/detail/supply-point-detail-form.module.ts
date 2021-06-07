import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { SupplyPointDetailFormComponent } from './supply-point-detail-form.component';

@NgModule({
    declarations: [
        SupplyPointDetailFormComponent,
    ],
    exports: [
        SupplyPointDetailFormComponent,
    ],
    imports: [
        AddressWhispererModule,
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
        DirectivesModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        LoaderModule,
        PipesModule,
        ReactiveFormsModule,
        RouterModule,
        SelectModule,
    ],
})
export class SupplyPointDetailFormModule {}
