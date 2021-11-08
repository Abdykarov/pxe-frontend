import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { PersonalInfoFormComponent } from './personal-info-form.component';

@NgModule({
    declarations: [PersonalInfoFormComponent],
    exports: [PersonalInfoFormComponent],
    imports: [
        AddressWhispererModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
        DirectivesModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class PersonalInfoFormModule {}
