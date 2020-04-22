import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginSupplyAuthFormComponent } from './login-supply-auth-form.component';

@NgModule({
    declarations: [
        LoginSupplyAuthFormComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        DirectivesModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginSupplyAuthFormComponent,
    ],
})
export class LoginSupplyAuthFormModule {}
