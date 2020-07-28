import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { SupplierProfileFormComponent } from 'src/common/containers/form/forms/supplier-profile/supplier-profile-form.component';

@NgModule({
    declarations: [
        SupplierProfileFormComponent,
    ],
    exports: [
        SupplierProfileFormComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
    ],
})
export class SupplierProfileFormModule {}
