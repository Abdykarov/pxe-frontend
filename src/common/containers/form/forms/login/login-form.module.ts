import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
    declarations: [LoginFormComponent],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        DirectivesModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [LoginFormComponent],
})
export class LoginFormModule {}
