import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractFormComponent } from './contract-form.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

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
