import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PersonalInfoFormComponent } from './personal-info-form.component';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        PersonalInfoFormComponent,
    ],
    exports: [
        PersonalInfoFormComponent,
    ],
    imports: [
        AddressWhispererModule,
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class PersonalInfoFormModule {}
