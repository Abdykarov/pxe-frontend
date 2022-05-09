import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginSupplyAuthFormComponent } from './login-supply-auth-form.component';

@NgModule({
    declarations: [LoginSupplyAuthFormComponent],
    imports: [
        ButtonModule,
        CommonModule,
        DirectivesModule,
        FormModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    exports: [LoginSupplyAuthFormComponent],
})
export class LoginSupplyAuthFormModule {}
