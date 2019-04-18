import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-page.component';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        FormModule,
        CommonModule,
        LoginRoutingModule,
        ModalModule,
        ReactiveFormsModule,
    ],
})
export class LoginPageModule {}
