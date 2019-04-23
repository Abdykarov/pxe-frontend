import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginFormModule } from 'src/common/containers/form-container/login-form/login-form.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SignInComponent } from './sign-in.component';
import { SignInFormModule } from 'src/common/containers/form-container/sign-in-form/sign-in-form.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        SignInComponent,
    ],
    exports: [
        SignInComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        FormModule,
        CommonModule,
        LoginFormModule,
        ModalModule,
        LayoutContainerModule,
        ReactiveFormsModule,
        SignInFormModule,
        SignInRoutingModule,
        SupplierModule,
    ],
})
export class SignInModule { }
