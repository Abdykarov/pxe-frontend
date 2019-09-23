import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AddressWhispererByHandFormComponent } from './address-whisperer-by-hand-form.component';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        AddressWhispererByHandFormComponent,
    ],
    exports: [
        AddressWhispererByHandFormComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        // overit jestli musi bejt
        SelectModule,
    ],
})
export class AddressWhispererByHandFormModule { }
