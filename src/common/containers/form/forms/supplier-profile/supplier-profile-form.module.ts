import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierProfileFormComponent } from 'src/common/containers/form/forms/supplier-profile/supplier-profile-form.component';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';

@NgModule({
    declarations: [SupplierProfileFormComponent],
    exports: [SupplierProfileFormComponent],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        PipesModule,
        PlaceloaderModule,
        ReactiveFormsModule,
        TooltipModule,
    ],
})
export class SupplierProfileFormModule {}
