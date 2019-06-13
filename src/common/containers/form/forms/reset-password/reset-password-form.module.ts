import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResetPasswordFormComponent } from './reset-password-form.component';

@NgModule({
    declarations:
    [
        ResetPasswordFormComponent,
    ],
    exports:
    [
        ResetPasswordFormComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ResetPasswordFormModule { }
