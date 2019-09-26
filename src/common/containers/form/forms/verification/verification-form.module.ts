import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { VerificationFormComponent } from './verification-form.component';

@NgModule({
    declarations: [
        VerificationFormComponent,
    ],
    exports: [
        VerificationFormComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class VerificationFormModule { }