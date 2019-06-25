import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContractFormComponent } from './contract-form.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';

@NgModule({
    declarations: [
        ContractFormComponent,
    ],
    exports: [
        ContractFormComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ContractFormModule { }
