import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ChangePasswordFormComponent } from './change-password-form.component';
import { FormModule } from 'src/common/ui/forms/form.module';

@NgModule({
    declarations: [
        ChangePasswordFormComponent,
    ],
    exports: [
        ChangePasswordFormComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ChangePasswordFormModule { }
