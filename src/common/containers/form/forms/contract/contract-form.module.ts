import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    ],
})
export class ContractFormModule { }
